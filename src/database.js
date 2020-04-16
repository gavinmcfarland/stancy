import { singular } from 'pluralize'

const fs = require('fs')
const path = require('path')
const marked = require('marked')
const matter = require('gray-matter')
const pluralize = require('pluralize')


function isFile(item) {
    if (/\..+$/.test(item)) {
        return item.split('.')[0]
    }
    else {
        return false
    }
}

function isFolder(item) {
    if (!(/\..+$/.test(item))) {
        return item
    }
    else {
        return false
    }
}

function createArray(dir, item) {
    if (isFolder(item)) {
        let array = []
        dir = path.join(dir, item)

        fs.readdirSync(dir).map((item, index) => {
            if (!(/\index..+$/.test(item))) {
                let object = createObject(dir, item, index)
                if (object !== undefined) {
                    array.push(object)
                }
            }

        })

        return array
    }
}

function getFileExt(item) {
    return item.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1]
}

function parseJson(dir, item) {
    if (getFileExt(item) === "json") {
        let content = fs.readFileSync(path.join(dir, item), 'utf8')

        return JSON.parse(content)
    }
}

function parseMarkdown(dir, item) {
    if (getFileExt(item) === "md") {
        let object = {
            content: marked(fs.readFileSync(path.join(dir, item), 'utf8'))
        }

        return object
    }
}

function parseContent(dir, item) {
    let result = parseJson(dir, item) || parseMarkdown(dir, item)
    return result
}

function createObject(dir, item, index) {
    let object = {}


    object = {
        _id: index,
        _file: item
    }
    if (isFile(item)) {
        Object.assign(object, parseContent(dir, item))
    }
    else {
        let containsChildren = false
        let hasIndex = false
        let subDir = path.join(dir, item)

        fs.readdirSync(subDir).map((item) => {
            if (!(/\index..+$/.test(item))) {
                containsChildren = true
            }
            else {
                hasIndex = true
                Object.assign(object, parseContent(subDir, item))
            }
        })

        if (pluralize.isSingular(item) && !hasIndex) {
            let childObject = {}

            fs.readdirSync(subDir).map((item, index) => {

                let name = item.split('.')[0]

                childObject[name] = parseContent(subDir, item)

            })

            Object.assign(object, childObject)
        }
        else {

            if (containsChildren) {
                object.children = createArray(dir, item, index)
            }
            // if (hasIndex) {
            //     object.content = hasIndex
            // }

            if (!hasIndex) {
                object = undefined
            }
        }

    }

    return object
}


export function database(dir) {


    // For each item in array
    let database = fs.readdirSync(dir).map((item, index) => {


        // Create an collection
        let folder = isFolder(item)
        let file = isFile(item)
        let plural = pluralize.isPlural(item)
        let singular = pluralize.isSingular(item)

        if (folder && plural) {
            return {
                [folder]: createArray(dir, item)
            }
        }
        else if (folder && singular) {
            return {
                [folder]: createObject(dir, folder, index)
            }
        }
        else {
            return {
                [file]: createObject(dir, item, index)
            }
        }

    })

    return Object.assign({}, ...database)

}


export function write(dir) {
    let db = JSON.stringify(database(dir), null, '\t')
    fs.writeFile('db.json', db, (err) => {
        if (err) throw err;
        // console.log('The file has been saved!');
    });
}


