# Sapper

This is an example of integrating Stancy with Sapper to support both local editing and production.

1. Install Sapper dependencies.
    ```bash
    npm install
    ```
2. Install Stancy as a dependency.
    ```bash
    npm install stancy --save-dev
    ```
3. Add code to start server for the API, you can add this to _rollup.config.js_.

    __src/rollup.config.js__
    ```js
    // ...
    import stancy from 'stancy';

    if (dev) {
        stancy('content/').serve('4000', '/api/');
    }
    // ...
    ```
4. Create a function to get data from the API and customise the local and remot API server addresses.

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
5. Display data on page.

    __src/routes/about.svelt__
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
6. Test it by starting Sapper and viewing http://localhost:3000/about. When you make changes to the content you'll need to refresh the browser. 

    ```bash
    npm run dev
    ```
