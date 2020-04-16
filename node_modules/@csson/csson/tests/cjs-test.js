const csson = require('../index.cjs')

const tests = [
  // Function testing
  [
    csson(),
    undefined,
    'No input should return undefined'
  ],
  [
    csson``,
    undefined,
    'Empty input as tagged template string returns undefined'
  ],
  [
    csson(''),
    undefined,
    'Empty input as function call returns undefined'
  ],
  [
    csson`<xml>oops</xml>`,
    undefined,
    'bad input returns undefined'
  ],
  [
    csson`${1+1}`.toString(),
    '2',
    'tagged template with `${1+1}` equals "2"'
  ],

  // Testing types

  // <json-number>
  [
    csson`1`.type,
    '<json-number>',
    '1 is <json-number>'
  ],
  [
    csson`1`.value,
    1,
    '1 value is 1'
  ],
  [
    typeof csson`1`.toString(),
    'string',
    'csson`1`.toString() is a string'
  ],
  [
    csson`1`.toString(),
    '1',
    'csson`1`.toString() is "1"'
  ],
  [
    typeof csson`1`.toJSON(),
    'number',
    'csson`1`.toJSON() is a number'
  ],
  [
    JSON.stringify(csson`1`),
    "1",
    'JSON.stringify(csson`1`) is "1"'
  ],

  // <json-true>
  [
    csson`true`.type,
    '<json-true>',
    'true is <json-true>'
  ],
  [
    csson`true`.value,
    true,
    'true is true'
  ],
  [
    typeof csson`true`.toString(),
    'string',
    'csson`true`.toString() is a string'
  ],
  [
    csson`true`.toString(),
    'true',
    'csson`true`.toString() is "true"'
  ],
  [
    csson`true`.toJSON(),
    true,
    'csson`true`.toJSON() is a true'
  ],
  [
    JSON.stringify(csson`true`),
    "true",
    'JSON.stringify(csson`true`) is "true"'
  ],

  // <json-false>
  [
    csson`false`.type,
    '<json-false>',
    'false is <json-false>'
  ],
  [
    csson`false`.value,
    false,
    'false is false'
  ],
  [
    typeof csson`false`.toString(),
    'string',
    'csson`false`.toString() is a string'
  ],
  [
    csson`false`.toString(),
    'false',
    'csson`false`.toString() is "false"'
  ],
  [
    csson`false`.toJSON(),
    false,
    'csson`false`.toJSON() is a false'
  ],
  [
    JSON.stringify(csson`false`),
    "false",
    'JSON.stringify(csson`false`) is "false"'
  ],

  // <json-null>
  [
    csson`null`.type,
    '<json-null>',
    'null is <json-null>'
  ],
  [
    csson`null`.value,
    null,
    'null is null'
  ],
  [
    typeof csson`null`.toString(),
    'string',
    'csson`null`.toString() is a string'
  ],
  [
    csson`null`.toString(),
    'null',
    'csson`null`.toString() is "null"'
  ],
  [
    csson`null`.toJSON(),
    null,
    'csson`null`.toJSON() is a null'
  ],
  [
    JSON.stringify(csson`null`),
    'null',
    'JSON.stringify(csson`null`) is "null"'
  ],

  // <json-string>
  [
    csson`"hello"`.type,
    '<json-string>',
    '"hello" is <json-string>'
  ],
  [
    csson`"hello"`.value,
    "hello",
    '"hello" is "hello"'
  ],
  [
    typeof csson`"hello"`.toString(),
    'string',
    'csson`"hello"`.toString() is a string'
  ],
  [
    csson`"hello"`.toString(),
    '"hello"',
    'csson`"hello"`.toString() is "hello"'
  ],
  [
    csson`"hello"`.toJSON(),
    'hello',
    'csson`"hello"`.toJSON() is a string hello'
  ],
  [
    JSON.stringify(csson`"hello"`),
    '"hello"',
    'JSON.stringify(csson`"hello"`) is a string "hello"'
  ],

  // <css-ident>
  [
    csson`hello`.type,
    '<css-ident>',
    'hello is <css-ident>'
  ],
  [
    csson`hello`.value,
    "hello",
    'hello is "hello"'
  ],
  [
    typeof csson`hello`.toString(),
    'string',
    'csson`hello`.toString() is a string'
  ],
  [
    csson`hello`.toString(),
    'hello',
    'csson`hello`.toString() is "hello"'
  ],
  [
    csson`hello`.toJSON(),
    "hello",
    'csson`hello`.toJSON() is a string "hello"'
  ],
  [
    JSON.stringify(csson`hello`),
    '"hello"',
    'JSON.stringify(csson`hello`) is a string "hello"'
  ],

  // <css-hash>
  [
    csson`#hash`.type,
    '<css-hash>',
    '#hash is <css-hash>'
  ],
  [
    csson`#hash`.value,
    "hash",
    '#hash is hash'
  ],
  [
    typeof csson`#hash`.toString(),
    'string',
    'csson`#hash`.toString() is a string'
  ],
  [
    csson`#hash`.toString(),
    '#hash',
    'csson`#hash`.toString() is "#hash"'
  ],
  [
    csson`#hash`.toJSON(),
    "#hash",
    'csson`#hash`.toJSON() is a string "#hash"'
  ],
  [
    JSON.stringify(csson`#hash`),
    '"#hash"',
    'JSON.stringify(csson`#hash`) is a string "#hash"'
  ],

  // <css-url>
  [
    csson`url(unquoted)`.type,
    '<css-url>',
    'url(unquoted) is <css-url>'
  ],
  [
    csson`url('single')`.type,
    '<css-url>',
    `url('single') is <css-url>`
  ],
  [
    csson`url("double")`.type,
    '<css-url>',
    'url("double") is <css-url>'
  ],
  [
    csson`url(unquoted)`.value,
    "unquoted",
    'url(unquoted) is unquoted'
  ],
  [
    csson`url('single')`.value,
    "single",
    `url('single') is 'single'`
  ],
  [
    csson`url("double")`.value,
    "double",
    'url("double") is "double"'
  ],
  [
    typeof csson`url(unquoted)`.toString(),
    'string',
    'csson`url(unquoted)`.toString() is a string'
  ],
  [
    typeof csson`url('single')`.toString(),
    'string',
    `csson\`url('single')\`.toString() is a string`
  ],
  [
    typeof csson`url("double")`.toString(),
    'string',
    'csson`url("double")`.toString() is a string'
  ],
  [
    csson`url(unquoted)`.toString(),
    'url(unquoted)',
    'csson`url(unquoted)`.toString() is url(unquoted)'
  ],
  [
    csson`url('single')`.toString(),
    `url(single)`,
    `csson\`url('single')\`.toString() is url(single)`
  ],
  [
    csson`url("double")`.toString(),
    'url(double)',
    'csson`url("double")`.toString() is url(double)'
  ],
  [
    csson`url(unquoted)`.toJSON(),
    "unquoted",
    'csson`url(unquoted)`.toJSON() is a string "unquoted"'
  ],
  [
    csson`url('single')`.toJSON(),
    "single",
    `csson\`url('single')\`.toJSON() is a string "single"`
  ],
  [
    csson`url("double")`.toJSON(),
    "double",
    'csson`url("double")`.toJSON() is a string "double"'
  ],
  [
    JSON.stringify(csson`url(unquoted)`),
    '"unquoted"',
    'JSON.stringify(csson`url(unquoted)`) is a string "unquoted"'
  ],
  [
    JSON.stringify(csson`url('single')`),
    '"single"',
    `JSON.stringify(csson\`url('single')\`) is a string "single"`
  ],
  [
    JSON.stringify(csson`url("double")`),
    '"double"',
    'JSON.stringify(csson`url("double")`) is a string "double"'
  ],

  // <json-array>
  [
    csson`[1, 2, 3]`.type,
    '<json-array>',
    '[1, 2, 3] is <json-array>'
  ],
  [
    JSON.stringify(csson`[1, 2, 3]`.value),
    JSON.stringify([1, 2, 3]),
    '[1, 2, 3] is [1, 2, 3]'
  ],
  [
    typeof csson`[1, 2, 3]`.toString(),
    'string',
    'csson`[1, 2, 3]`.toString() is a string'
  ],
  [
    csson`[1, 2, 3]`.toString(),
    '[1,2,3]',
    'csson`[1, 2, 3]`.toString() is "[1,2,3]"'
  ],
  [
    Array.isArray(csson`[1, 2, 3]`.toJSON()),
    true,
    'csson`[1, 2, 3]`.toJSON() is an array'
  ],
  [
    JSON.stringify(csson`[1, 2, 3]`),
    '[1,2,3]',
    'JSON.stringify(csson`[1, 2, 3]`) is an "[1,2,3]"'
  ],

  // <csson-array>
  [
    csson`[one, #two, url(three)]`.type,
    '<csson-array>',
    '[one, #two, url(three)] is <csson-array>'
  ],
  [
    JSON.stringify(csson`[one, #two, url(three)]`.value),
    JSON.stringify(["one", "#two", "three"]),
    '[one, #two, url(three)] is ["one", "#two", "three"]'
  ],
  [
    typeof csson`[one, #two, url(three)]`.toString(),
    'string',
    'csson`[one, #two, url(three)]`.toString() is a string'
  ],
  [
    csson`[one, #two, url(three)]`.toString(),
    '[one,#two,url(three)]',
    'csson`[one, #two, url(three)]`.toString() is "[one,#two,url(three)]"'
  ],
  [
    Array.isArray(csson`[one, #two, url(three)]`.toJSON()),
    true,
    'csson`[one, #two, url(three)]`.toJSON() is an array'
  ],
  [
    JSON.stringify(csson`[one, #two, url(three)]`),
    '["one","#two","three"]',
    `JSON.stringify(csson\`[one, #two, url(three)]\`) is '["one","#two","three"]'`
  ],

  // <json-object>
  [
    csson`{"one": 1, "two": 2}`.type,
    '<json-object>',
    '{"one": 1, "two": 2} is <json-object>'
  ],
  [
    JSON.stringify(csson`{"one": 1, "two": 2}`.value),
    JSON.stringify({one: 1, two: 2}),
    '{"one": 1, "two": 2} is {"one": 1, "two": 2}'
  ],
  [
    typeof csson`{"one": 1, "two": 2}`.toString(),
    'string',
    'csson`{"one": 1, "two": 2}`.toString() is a string'
  ],
  [
    csson`{"one": 1, "two": 2}`.toString(),
    '{"one":1,"two":2}',
    'csson`{"one": 1, "two": 2}`.toString() is "{"one":1,"two":2}"'
  ],
  [
    typeof csson`{"one": 1,"two":2}`.toJSON(),
    'object',
    'csson`{"one":1,"two":2}`.toJSON() is an object'
  ],
  [
    JSON.stringify(csson`{"one": 1,"two":2}`),
    '{"one":1,"two":2}',
    `JSON.stringify(csson\`{"one":1,"two":2}\`) is '{"one":1,"two":2}'`
  ],

  // <csson-object>
  [
    csson`{one: 1, two: 2}`.type,
    '<csson-object>',
    '{one: 1, two: 2} is <csson-object>'
  ],
  [
    JSON.stringify(csson`{one: 1, two: 2}`.value),
    JSON.stringify({one: 1, two: 2}),
    '{"one": 1, "two": 2} is {"one": 1, "two": 2}'
  ],
  [
    typeof csson`{one: 1, two: 2}`.toString(),
    'string',
    'csson`{one: 1, two: 2}`.toString() is a string'
  ],
  [
    csson`{one: 1, two: 2}`.toString(),
    '{one:1,two:2}',
    'csson`{one: 1, two: 2}`.toString() is "{one:1,two:2}"'
  ],
  [
    typeof csson`{one: 1, two: 2}`.toJSON(),
    'object',
    'csson`{one: 1, two: 2}`.toJSON() is an object'
  ],
  [
    JSON.stringify(csson`{one: 1, two: 2}`),
    '{"one":1,"two":2}',
    `JSON.stringify(csson\`{one: 1, two: 2}\`) is '{"one":1,"two":2}'`
  ],

  // <css-qualified-rule>
  [
    csson`a { b: c; }`.type,
    '<css-qualified-rule>',
    'a { b: c; } is <css-qualified-rule>'
  ],
  [
    JSON.stringify(csson`a { b: c; }`),
    JSON.stringify({a: {b: 'c'}}),
    'a { b: c; } is {a:{b:c}}'
  ],
  [
    typeof csson`a { b: c; }`.toString(),
    'string',
    'csson`a { b: c; }`.toString() is a string'
  ],
  [
    csson`a { b: c; }`.toString(),
    'a{b:c}',
    'csson`a { b: c; }`.toString() is "a{b:c}"'
  ],
  [
    JSON.stringify(csson`a { b: c; }`.toJSON()),
    '{"a":{"b":"c"}}',
    'csson`a { b: c; }`.toJSON() is {a: {b: "c"}}'
  ],
  [
    JSON.stringify(csson`a { b: c; }`),
    '{"a":{"b":"c"}}',
    'JSON.stringify(csson`a { b: c; }`.toJSON()) is "{"a":{"b":"c"}}"'
  ],

  // CSSON Features
  [
    JSON.stringify(
      csson('/* css */ /* comments */ 1 /* ignored */')
    ),
    '1',
    'CSS comments ignored'
  ],
  [
    csson('[1, 2, 3]').value.length,
    3,
    '[1, 2, 3] is a <json-array> type with a length of 3'
  ],
  [
    csson('[#one, url(two), three]').value.length,
    3,
    '[#one, url(two), three] is a <csson-array> type with a length of 3'
  ],
  [
    Object.entries(csson('{"a": 1, "b": 2, "c": 3}').value).length,
    3,
    '{"a": 1, "b": 2, "c": 3} is a <json-object> type with 3 properties'
  ],
  [
    Object.entries(csson('{a: one, b: #two, c: url(three)}').value).length,
    3,
    '{a: one, b: #two, c: url(three)} is a <csson-object> type with 3 properties'
  ],
  [
    Object.entries(csson('a {b: c; d: e;}').value).length,
    2,
    'a {b: c; d: e;} is a <css-qualified-rule> type with 2 properties'
  ],
  [
    csson('[[[3]]]').value[0][0][0],
    3,
    '[[[3]]] is a deeply-nested <json-number> 3 inside 3 <json-array>'
  ],

  // Testing JSON
  [
    JSON.stringify(JSON.parse(`[{"a": "a()"}]`)),
    JSON.stringify(csson(`[{"a": "a()"}]`)),
    'JSON array parses as csson'
  ],
  [
    JSON.stringify(JSON.parse(`{"a": {"b": "b()"}}`)),
    JSON.stringify(csson(`{"a": {"b": "b()"}}`)),
    'JSON object parses as csson'
  ],
  [
    csson`1e3`.value,
    1000,
    '1e3 is the number 1000'
  ],
  [
    csson`-1`.value,
    -1,
    'negative number'
  ],
  [
    csson`1.23456789`.value,
    1.23456789,
    'decimal number'
  ],
]

// Run tests
const passed = tests.filter(([a, b]) => a === b)
const failed = tests.filter(([a, b]) => a !== b)

console.log(`\nSuccessful: ${passed.length}/${tests.length}\n`)
//passed.forEach(([a, b, message]) => console.log(a === b, message))

if (failed.length) {
  console.log(`\nFailed: ${failed.length}/${tests.length}\n`)
  failed.forEach(([a, b, message]) => console.log(a, b, message))
}