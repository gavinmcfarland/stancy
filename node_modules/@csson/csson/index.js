import * as parseCSS from './lib/parse-css/index.js'

function stringify(tokens = []) {
  return tokens.map(token => token.toSource()).join('')
}

class CSSONType {
  constructor() {
    if (this.constructor === CSSONType) {
      throw new Error(`Can't create abstract base class directly`)
    }
  }
  toJSON() { return this.value }
  toString() { return String(this.value) }
}

class JSONType extends CSSONType {
  constructor() {
    super()

    if (this.constructor === JSONType) {
      throw new Error(`Can't create abstract base class directly`)
    }
  }
  toString() { return JSON.stringify(this.value) }
}

class JSONNumber extends JSONType {
  constructor(value) {
    super()

    this.type = '<json-number>'
    this.value = Number(value)
  }
}

class JSONTrue extends JSONType {
  constructor() {
    super()

    this.type = '<json-true>'
    this.value = true
  }
}

class JSONFalse extends JSONType {
  constructor() {
    super()

    this.type = '<json-false>'
    this.value = false
  }
}

class JSONNull extends JSONType {
  constructor() {
    super()

    this.type = '<json-null>'
    this.value = null
  }
}

class JSONString extends JSONType {
  constructor(value) {
    super()

    this.type = '<json-string>'
    this.value = value
  }
}

class CSSIdent extends CSSONType {
  constructor(value) {
    super()

    this.type = '<css-ident>'
    this.value = value
  }
}

class CSSHash extends CSSONType {
  constructor(value) {
    super()

    this.type = '<css-hash>'
    this.value = value
  }
  toJSON() { return `#${this.value}` }
  toString() { return `#${this.value}` }
}

class CSSUrl extends CSSONType {
  constructor(value) {
    super()

    this.type = '<css-url>'
    this.value = value
  }
  toString() { return `url(${this.value})` }
}

class JSONArray extends JSONType {
  constructor(value) {
    super()

    this.type = '<json-array>'
    this.value = value
  }
}

class CSSONArray extends JSONArray {
  constructor(value) {
    super()

    this.type = '<csson-array>'
    this.value = value
  }
  toJSON() { return this.value }
  toString() { return `[${this.value}]` }
}

class JSONObject extends JSONType {
  constructor(value) {
    super()

    this.type = '<json-object>'
    this.value = value
  }
}

class CSSONObject extends JSONObject {
  constructor(value) {
    super()

    this.type = '<csson-object>'
    this.value = value
  }
  toString() {
    return `{${
      Object.entries(this.value)
        .map(([key, value]) => `${key}:${value}`)
        .join(',')
    }}`
  }
}

class CSSQualifiedRule extends CSSONType {
  constructor(name, properties) {
    super()

    this.type = '<css-qualified-rule>'
    this.name = name
    this.value = properties
  }
  toJSON() { return JSON.parse(`{${JSON.stringify(this.name)}:${JSON.stringify(this.value)}}`) }
  toString() {
    return `${this.name}{${
      Object.entries(this.value)
        .map(([key, value]) => `${key}:${value}`)
        .join(';')
    }}`
  }
}

export default function parse(input = '', ...expressions) {
  // Support as tagged template function
  if (Array.isArray(input)) {
    input = input.reduce(
      (accumulator, string, index) => {
        accumulator += string

        if (expressions[index]) {
          accumulator += expressions[index]
        }

        return accumulator
      },
      ''
    )
  }

  // Try To Parse A Rule
  let rule

  try {
    rule = parseCSS.parseARule(String(input))
  } catch (error) {}

  // Try To Parse A Component Value
  let component

  try {
    component = parseCSS.parseAComponentValue(String(input))
  } catch (error) {}

  if (
    component
    && (
      rule === undefined
      || rule.prelude.length === 0
    )
  ) {
    // <json-number>
    if (component.tokenType === 'NUMBER') {
      return new JSONNumber(component.repr)
    }

    // <json-true>
    if (
      component.tokenType === 'IDENT'
      && component.value === 'true'
    ) {
      return new JSONTrue()
    }

    // <json-false>
    if (
      component.tokenType === 'IDENT'
      && component.value === 'false'
    ) {
      return new JSONFalse()
    }

    // <json-null>
    if (
      component.tokenType === 'IDENT'
      && component.value === 'null'
    ) {
      return new JSONNull()
    }

    // <css-ident>
    if (component.tokenType === 'IDENT') {
      return new CSSIdent(component.value)
    }

    // <json-string>
    if (component.tokenType === 'STRING') {
      return new JSONString(component.value)
    }

    // <css-url>
    if (component.tokenType === 'URL') {
      return new CSSUrl(component.value)
    }
    if (
      component.type === 'FUNCTION'
      && component.name === 'url'
    ) {
      return new CSSUrl(
        parse(
          stringify(component.value)
        ).value
      )
    }

    // <css-hash>
    if (component.tokenType === 'HASH') {
      return new CSSHash(component.value)
    }

    // <json-array> & <csson-array>
    if (
      component.type === 'BLOCK'
      && component.name === '['
    ) {
      // Try parsing JSON array
      let json

      try {
        json = JSON.parse(
          `[${stringify(component.value)}]`
        )
      } catch (error) {}

      // <json-array>
      if (json) {
        return new JSONArray(
          component.value.reduce(
            (list, token) => {
              let json

              try {
                json = JSON.parse(
                  token.toSource()
                )
              } catch (error) {}
  
              if (json !== undefined) {
                list.push(json)
              }
  
              return list
            },
            []
          )
        )
      }

      // <csson-array>
      if (json === undefined) {
        return new CSSONArray(
          component.value.reduce(
            (list, token) => {
              const object = parse(token.toSource())

              if (object !== undefined) {
                list.push(object)
              }

              return list
            },
            []
          )
        )
      }
    }

    // <json-object> & <csson-object>
    if (
      component.type === 'BLOCK'
      && component.name === '{'
    ) {
      // Try parsing a JSON object
      let json

      try {
        json = JSON.parse(
          `{${stringify(component.value)}}`
        )
      } catch (error) {}

      // <json-object>
      if (json) {
        return new JSONObject(
          parseCSS.parseAListOfDeclarations(
            parseCSS.parseACommaSeparatedListOfComponentValues(
              stringify(component.value)
            ).map(property => property.map(token =>
              token.tokenType === 'STRING'
                ? token.value
                : token.toSource()
              ).join('')
            ).join(';')
          ).reduce(
            (obj, prop) => {
              obj[prop.name] = JSON.parse(
                stringify(prop.value)
              )

              return obj
            },
            {}
          )
        )
      }

      // <csson-object>
      if (json === undefined) {
        return new CSSONObject(
          parseCSS.parseAListOfDeclarations(
            parseCSS.parseACommaSeparatedListOfComponentValues(
              stringify(component.value)
            ).map(prop => stringify(prop)).join(';')
          ).reduce(
            (obj, prop) => {
              obj[prop.name] = parse(stringify(prop.value))

              return obj
            },
            {}
          )
        )
      }
    }

  } else if (rule !== undefined) {
    // <css-qualified-rule>
    return new CSSQualifiedRule(
      stringify(rule.prelude).trim(),
      parseCSS.parseAListOfDeclarations(rule.value.value).reduce(
        (obj, prop) => {
          obj[prop.name] = parse(stringify(prop.value))

          return obj
        },
        {}
      )
    )
  }
}