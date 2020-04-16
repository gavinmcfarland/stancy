// server.js
import express from 'express'
import { parse, evaluate } from 'groq-js'
import escape from 'html-escape'
import jsonata from "jsonata";
import { database, write } from './database.js'

// async function getContent(dataset, resource) {
//     let input = `*.${resource}[_id == 0]{_file}`
//     let tree = parse(input)
//     let value = await evaluate(tree, { dataset })
//     let result = await value.get()

//     return result
// }


async function getContent(dataset, resource) {
    if (resource) {
        var expression = jsonata(`${resource}`);
        var result = expression.evaluate(dataset);
        return result
    }
    else {
        return dataset
    }

}

function start(dir) {
    const db = database(dir)

    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
        let resource = req.params.resource
        getContent(db).then(value => {
            // console.log(value)
            // console.log(req.query)
            res.send(`<pre>${escape(JSON.stringify(value, null, '\t'))}</pre>`)
        })


    })


    app.get('/:resource', (req, res) => {
        let resource = req.params.resource
        getContent(db, resource).then(value => {
            // console.log(value)
            // console.log(req.query)
            res.send(`<pre>${escape(JSON.stringify(value, null, '\t'))}</pre>`)
        })


    })

    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`)
    })
}



export default {
    database,
    write,
    start
}

