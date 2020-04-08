// server.js
const jsonServer = require('json-server')
const singular = require('./singular.js')
const field = require('./field.js')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const database = require('./database.js')

database

server.use(middlewares)
server.use(singular)
server.use(field)
server.use(jsonServer.rewriter({
    "/:folder/:page": "/:folder?slug=:page&singular=1",
    "/:folder/:page/children": "/:folder?slug=:page&singular=1&_field=children",
    "/:folder/:page/images": "/images?pageId=:page"
}))

server.use(router)
server.listen(3000, () => {
    console.log(`
JSON Server is running on http://localhost:3000

Examples
http://localhost:3000/pages
http://localhost:3000/pages/about
http://localhost:3000/pages/posts/children
http://localhost:3000/images
http://localhost:3000/pages/example-post/images

`)
})