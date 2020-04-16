# CSSON

A JSON superset with additional types from CSS (and comments!)

## About 

CSSON is a superset of [JSON](https://www.ecma-international.org/publications/standards/Ecma-404.htm)* that is parsed according to [CSS syntax](https://drafts.csswg.org/css-syntax-3/). All JSON can be handled as CSSON, though not every CSS style sheet can be parsed as CSSON.

It aims to be a more flexible and forgiving syntax for humans to work with compared to JSON, and also let developers encode common formats like fragment identifiers and urls.

> \* a superset of JSON as far as tested - CSS character escapes and JSON string escapes may overlap in a mutually exclusive way in the current implementation — if you know how to verify this, test this, or support this, please open an issue and report any bugs you find!

## Comments

Since CSSON is parsed according to CSS syntax, any [CSS comments](https://drafts.csswg.org/css-syntax-3/#comment-diagram) `/* */` will be safely ignored during parsing or conversion to JSON.

```css
/* It's like JSON… */
{
  /* but with comments… */
  "demo": [1, 2, 3] /* that can go anywhere! */
}
```

## CSSON Objects

CSSON is comprised of three kinds of objects: the JSON data types, a few additional types from CSS, and two special CSSON-only enhancements of JSON types that allow CSSON objects as values.

### JSON Types

- `<json-number>` is any JSON-compatible number
- `<json-string>` is any JSON-compatible string, whether single-quoted `''` or double-quoted `""`
- `<json-true>` is the token `true`
- `<json-false>` is the token `false`
- `<json-null>` is the token `null`
- `<json-array>` is a `[`-block containing a `,`-separated list of any JSON objects as values
- `<json-object>` is a `{`-block containing a `,`-separated list of properties with any `<json-string>` (single-quoted or double-quoted) for keys and any JSON object as values

### CSS Types

- [`<css-ident>`](https://drafts.csswg.org/css-syntax-3/#ref-for-typedef-ident-token%E2%91%A0) is any CSS-compatible ident token, excluding the reserved `true`, `false`, and `null` JSON types
- [`<css-hash>`](https://drafts.csswg.org/css-syntax-3/#hash-token-diagram) is any CSS-compatible hash token that starts with `#`
- [`<css-url>`](https://drafts.csswg.org/css-syntax-3/#url-token-diagram) is any CSS-compatible URL token, whether unquoted `url()`, single-quoted `url('')` or double-quoted `url("")`
- [`<css-qualified-rule>`](https://drafts.csswg.org/css-syntax-3/#qualified-rule) is any CSS-compatible qualified rule containing an optional prelude (used for a selector in CSS), followed by a `{`-block containing a `;`-separated list of properties with any `<css-ident>` for keys and any CSSON object as values

### CSSON Types

- `<csson-array>` is a `[`-block containing a `,`-separated list of any CSSON object as values
- `<csson-object>` is a `{`-block containing a `,`-separated list of properties with and `<css-ident>` as keys and any CSSON object as values

## Converting CSSON Types to JSON Types

While it's possible to use CSSON to take advantage of the additional types it includes (like URLs) to describe your data in a richer way, if you only want to use CSSON as a more friendly way to managing JSON files or include comments in JSON files that should be fine as well.

### It's JLJ (Just like JSON)

CSSON always attemps to parse a JSON type first, so `1` will always be a `<json-number>`, not a [`<css-number>`](https://drafts.csswg.org/css-syntax-3/#number-token-diagram).

When converting to JSON there are predefined type conversions built into CSSON objects:

#### `<css-ident>` becomes a JSON string

```css
ident
```

```json
"ident"
```

#### `<css-hash>` becomes a JSON string

```css
#hash
```

```json
"#hash"
```

#### `<css-url>` becomes a JSON string

```css
url(https://url.com)
```

```json
"https://url.com"
```

#### `<csson-array>` becomes a JSON array

```css
[one, #two, url(three)]
```

```json
["one", "#two", "three"]
```

#### `<csson-object>` becomes a JSON object

```css
{
  one: one,
  two: #two,
  three: url(three)
}
```

```json
{
  "one": "one",
  "two": "#two",
  "three": "three"
}
```

#### `<css-qualified-rule>` becomes a JSON object with a single property

```css
selector {
  property: value;
}
```

```json
{
  "selector": {
    "property": "value"
  }
}
```

## Usage

This package is available on [npm](http://npmjs.com/package/@csson/csson) and is delivered in two formats:

- [index.js](./index.js) is an ES module for use with [Deno](https://deno.land/), [QuickJS](https://bellard.org/quickjs), browsers, and ES module bundlers
- [index.cjs](./index.cjs) is a CommonJS module for use with [Node](https://nodejs.org/en/) and CommonJS bundlers

Below are some of the ways you can consume and use this package.

### Using CSSON via npx without installing anything

```bash
$ npx @csson/csson '/* example CSSON */ [1, 2, 3, a, #b, url(c)]'
```

```bash
$ npx @csson/csson path/to/data.csson
```

### Using as an ES module with Deno, QuickJS, or a browser

```js
import csson from 'https://unpkg.com/@csson/csson'

console.log(
  csson`
    /* CSSON Demo */
    {
      one: one,
      two: #two,
      three: url(three)
    }
  `
)
```

### Using as a CommonJS module with Node

```js
const CSSON = require('@csson/csson/index.cjs')

console.log(
  csson`
    /* CSSON Demo */
    {
      one: one,
      two: #two,
      three: url(three)
    }
  `
)
```

### Command-line usage with Node, Deno or QuickJS

#### Converting a string

To convert a string of CSSON to JSON, supply a string to the CLI script as the first argument:

```bash
$ node cli/node.js '/* example CSSON */ [1, 2, 3, a, #b, url(c)]'
```

```bash
$ deno cli/deno.js '/* example CSSON */ [1, 2, 3, a, #b, url(c)]'
```

```bash
$ qjs cli/quickjs.js '/* example CSSON */ [1, 2, 3, a, #b, url(c)]'
```

#### Converting a file

To convert a CSSON file to JSON, supply a pathname to the CLI script as the first argument:

```bash
$ node cli/node.js path/to/data.csson
```

```bash
$ deno --allow-read cli/deno.js path/to/data.csson
```

```bash
$ qjs cli/deno.js path/to/data.csson
```

> You can run `npm link` if you want to use `cli/node.js` on your system as the command `csson`

### Building an Executable

It's possible to build self-contained executables from the files in this repository in a few different ways.

#### Using the QuickJS Compiler

The first way we can build this into an executable is to use the [QuickJS compiler](https://bellard.org/quickjs/quickjs.html#qjsc-compiler). This will compile [cli/quickjs.js](./cli/quickjs.js) into C bytecode, and then compile that into a small self-contained executable:

```bash
$ qjsc -o csson-quickjs cli/quickjs.js
```

For a more optimized output, the QuickJS compiler allows you to exclude unused features. Building CSSON with the following options will produce the smallest executable:

```bash
$ qjsc -o csson-quickjs -fno-eval -fno-string-normalize -fno-regexp -fno-proxy -fno-map -fno-typedarray -fno-promise -fno-bigint cli/quickjs.js
```

#### Using pkg

The second way to build executables from this repository is to use Node and the [pkg](https://www.npmjs.com/package/pkg) package to compile [cli/node.js](./cli/node.js) into a self-contained executable that can run even without Node installed:

```bash
npx pkg --output csson-node cli/node.js
```

> You may need to supply a `--targets` argument, e.g. `--targets node12`, to build this with pkg if there are no build targets available for the latest node version

## Options

The default function this package exports can be used with a string, or as a tagged template function, this means you can use it like this:

```js
csson('/* demo */a {}')
```

```js
csson`{time: ${new Date().toString()}}`
```

## Examples

### Parsing CSSON from a string

```js
import csson from 'https://unpkg.com/@csson/csson'

// Either of these work
console.log(csson`[one, #two, url(three)]`)
console.log(csson(`[one, #two, url(three)]`))
```

### Converting CSSON to a string

```js
import csson from 'https://unpkg.com/@csson/csson'

const data = csson`[one, #two, url(three)]`

console.log(String(data))
```

### Converting CSSON to JSON

```js
import csson from 'https://unpkg.com/@csson/csson'

const data = csson`[one, #two, url(three)]`

console.log(JSON.stringify(data))
```

To see some examples of CSSON files, check out the files in the [examples/](./examples/) folder

## Online Conversion Tool

Check out the [CSSON to JSON converter](https://tomhodgins.github.io/CSSON/) online

## More Info

- [JSON.org](http://json.org)
- [CSS Syntax Specification](https://drafts.csswg.org/css-syntax-3/)
- [Tab's standards-based CSS parser](https://github.com/tabatkins/parse-css)
