import csson from '../index.js'

const file = Deno.args.slice(1)[0]
let data

try {
  data = new TextDecoder('utf-8').decode(Deno.readFileSync(file))
} catch (error) {
  data = file
}

// CSSON -> JSON
console.log(
  JSON.stringify(
    csson(data),
    null,
    2
  )
)