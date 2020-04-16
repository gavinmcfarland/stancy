#!/usr/bin/env node
const fs = require('fs')
const csson = require('../index.cjs')

const file = process.argv.slice(2)[0]
let data

try {
  data = fs.readFileSync(file).toString()
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