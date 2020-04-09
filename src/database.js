
const fs = require('fs')
const path = require('path')
const marked = require('marked')
const matter = require('gray-matter')


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
                array.push(createObject(dir, item, index))
            }

        })

        return array
    }
}

function createObject(dir, item, index) {
    let object = {}

    object = {
        id: index,
        title: item,
        content: 'content',
        slug: item.split('.')[0],
    }

    if (isFile(item)) {
        object.content = fs.readFileSync(path.join(dir, item), 'utf8')
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
                hasIndex = fs.readFileSync(path.join(subDir, item), 'utf8')
            }
        })
        if (containsChildren) {
            object.children = createArray(dir, item, index)
        }
        object.content = hasIndex


    }

    return object
}

module.exports = function createDatabase(dir) {


    // For each item in array
    let database = fs.readdirSync(dir).map((item, index) => {


        // Create an collection
        let folder = isFolder(item)
        let file = isFile(item)

        if (folder) {
            return {
                [folder]: createArray(dir, item)
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


function buildFile(dir) {
    let db = JSON.stringify(createDatabase(dir), null, '\t')
    fs.writeFile('db.json', db, (err) => {
        if (err) throw err;
        // console.log('The file has been saved!');
        // console.log(db)
    });
}

// buildFile('content/')


