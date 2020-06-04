# Sapper

This is an example of integrating Stancy with sapper to support both local editing and production.

1. Install Stancy as a dependency
    ```bash
    npm install stancy
    ```
1. Add code to tell sapper to start server for the API.

    __src/server.js__
    ```js
    import stancy from 'stancy';

    const { PORT, NODE_ENV } = process.env;
    const dev = NODE_ENV === 'development';

    if (dev) {
        stancy('content/').serve('4000', '/api/');
    }
    ```
2. Create a function to get data from API

    __src/node_modules/api.js__
    ```js

    var base = '';

    if (process.env.NODE_ENV === 'development') {
        base = 'http://localhost:4000/api';
        console.log('dev');
    } else {
        base = 'https://now-restlike-api.now.sh/api';
    }

    export function get({ method, path, data, token }) {
        const fetch = process.browser ? window.fetch : require('node-fetch').default;

        const opts = { method, headers: {} };

        if (data) {
            opts.headers['Content-Type'] = 'application/json';
            opts.body = JSON.stringify(data);
        }

        if (token) {
            opts.headers['Authorization'] = `Token ${token}`;
        }

        return fetch(`${base}/${path}`, opts).then((r) => r.text()).then((json) => {
            try {
                return JSON.parse(json);
            } catch (err) {
                return json;
            }
        });
    }
    ```
3. Enable importing JSON files in sapper

    __rollup.config.js__
    ```js
    // ...
    import json from 'rollup-plugin-json';
    // ...
    export default {
        // ...
        server: {
            plugins: [
                json({
                    exclude: [ 'node_modules/**' ]
                }),
            ]
        }
    }
    ```
3. Display data on page

    ```html
    <script context="module">
    import * as api from "api.js";
    export async function preload({ params }) {
        const { slug } = params;
        const page = await api.get(`pages/about`, null);
        return { page, slug };
    }
    </script>

    <script>
    export let page;
    </script>

    <svelte:head>
    <title>About</title>
    </svelte:head>

    <h1>About</h1>

    {@html page.content}
    ```