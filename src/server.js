// server.js
const jsonServer = require('json-server')
const singular = require('./singular.js')
const field = require('./field.js')
const createDatabase = require('./database.js')

const base = 'http://localhost:3000';

function send({ method, path, data, token }) {
    const fetch = process.browser ? window.fetch : require('node-fetch').default;

    const opts = { method, headers: {} };

    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    if (token) {
        opts.headers['Authorization'] = `Token ${token}`;
    }

    return fetch(`${base}/${path}`, opts)
        .then(r => r.text())
        .then(json => {
            try {
                return JSON.parse(json);
            } catch (err) {
                return json;
            }
        });
}

module.exports = {
    start: function folderAPI(dir) {
        const server = jsonServer.create()
        const router = jsonServer.router(createDatabase(dir))
        const middlewares = jsonServer.defaults()

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
            console.log(`Folder API started on http://localhost:3000`)
        })

    },
    get: function (path, token) {
        return send({ method: 'GET', path, token });
    }
}

