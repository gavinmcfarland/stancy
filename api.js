
const fs = require('fs')
const path = require('path')
const marked = require('marked')
const matter = require('gray-matter')

const dir = 'content/'

let database = {}
let object = {}

function createObject(dir, parent, level = 1) {

    let array = fs.readdirSync(dir)

    array.map((item, index) => {

        let folder = !(/\..+$/.test(item))

        // If Directory
        if (folder) {
            if (level === 1) {
                level++
                database[item] = []
                createObject(dir + item + '/', item, level)
            }

        }

        if (parent) {

            let object = {}
            let page = item.split('.')[0]
            let content = ""

            if (/\..+$/.test(item)) {
                content = fs.readFileSync(path.join(dir, item), 'utf8')
            }

            object.id = index
            object.title = page
            object.content = content

            if (!(/\..+$/.test(item))) {
                object.children = fs.readdirSync(dir + item + '/').map(item => {
                    return item.split('.')[0]
                })


            }

            database[parent].push(object)
        }

    })



    return database

}




console.log(JSON.stringify(createObject(dir), null, '\t'))





function getArray(dir) {
    // Get array of file names in dir
    return fs.readdirSync(dir)
}

function getFile(array) {

    return array.map(key => {

        return array.reduce((acc, curr, index, array) => {
            console.log(curr)

            return {
                [curr.split('.')[0]]: curr
            }
        }, {})




        // Is a file
        if (/\.md$/.test(fileName)) {

            const pageName = fileName.split('.')[0]
            const page = {
                [pageName]: {
                    name: fileName,
                    content: fs.readFileSync(path.join(dir, fileName), 'utf8')
                }
            }

            return page
        }

        // Is a directory
        else {

        }

        // return file
    })
}

function parseFile(page) {
    return parseMarkdown(page)
}

function parseMarkdown(page) {
    console.log(page)
    if (/\.md$/.test(page.name)) {
        // get matter data
        const { data, content } = matter(page.content)
        const { title, date } = data
        const slug = page.name.split('.')[0]
        const html = marked(content)
        return {
            title: title || slug,
            slug,
            content,
            date,
            html
        }
    }
}







// Get array of directories and files
// If item in array is file then create object
// If item in array is directory then get array of directorys and files