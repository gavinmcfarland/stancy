// server.js
const jsonServer = require('json-server')
const singular = require('./singular.js')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(singular)
server.use(jsonServer.rewriter({
    "/pages/:page": "/pages?slug=:page&singular=1",
    "/pages/:parent/children": "/pages?parentId=:parent",
    "/pages/:page/images": "/images?pageId=:page"
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