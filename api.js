
const fs = require('fs')
const path = require('path')
const marked = require('marked')
const matter = require('gray-matter')

function createDatabase(dir) {

    let database = []

    function createObject(dir, parent, object = {}, level = 0) {
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
                createObject(dir + '/' + item, item, object, level)

            }

            database.push(collection)

        })



        return Object.assign({}, ...database);

    }

    return JSON.stringify(createObject(dir), null, '\t')
}

function buildFile(dir) {
    let db = createDatabase(dir)
    fs.writeFile('db.json', db, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        console.log(db)
    });
}

buildFile('content/')




