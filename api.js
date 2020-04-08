
const fs = require('fs')
const path = require('path')
const marked = require('marked')
const matter = require('gray-matter')

const dir = 'content/'

let database = {}
let object = {}

function createObject(dir, parent, level = 0, object = {}, array = []) {
    level++

    // For each item in the folder
    fs.readdirSync(dir).map((item, index) => {

        let folder = !(/\..+$/.test(item))

        // If the item is a folder
        if (folder) {
            array = [{
                [item]: {}
            }]
            createObject(dir + item + '/', item, level, object, array)
        }

        else {
            let name = item.split('.')[0]

            object = {
                [name]: {
                    id: index,
                    content: fs.readFileSync(path.join(dir, item), 'utf8'),
                    title: name
                }
            }

            if (parent) {
                array.push(object)
                // console.log(database[parent])
            }


            // if (parent) {
            //     database[parent].push(object)
            // }
            // else {
            //     database.object
            // }

        }





        // console.log(object)


        // if (parent) {

        //     let object = {}
        //     let page = item.split('.')[0]
        //     let content = ""

        //     if (/\..+$/.test(item)) {
        //         content = fs.readFileSync(path.join(dir, item), 'utf8')
        //     }

        //     object.id = index
        //     object.title = page
        //     object.content = content

        //     if (!(/\..+$/.test(item))) {
        //         object.children = fs.readdirSync(dir + item + '/').map(item => {
        //             return item.split('.')[0]
        //         })


        //     }

        //     database[parent].push(object)
        // }

    })



    return database

}




// console.log(JSON.stringify(createObject(dir), null, '\t'))





let thing = []

function createFolderArray(dir, parent, object = {}, level = 0) {

    let database = {}
    level++
    let array = []
    let collection = {}

    fs.readdirSync(dir).forEach((item, index) => {
        let folder = !(/\..+$/.test(item))

        object = {
            id: index,
            title: item,
            content: 'content',
            slug: 'slug',
        }

        if (!folder) {

            if (!parent) {
                collection = {
                    [item.split('.')[0]]: object
                }

                // Object.assign(database, collection);
            }
            else {
                array.push(object)

                collection = {
                    [parent]: array
                }

            }

        }

        if (folder) {
            array.push(object)
            createFolderArray(dir + '/' + item, item, object, level)

        }

        thing.push(collection)

    })

    Object.assign(database, ...thing);

    return database

}


database = createFolderArray(dir)

console.log(database)

