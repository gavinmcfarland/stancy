# Sapper

This is an example of integrating Stancy with Sapper to support fetching content from production and previewing editing in development.

1. Install Sapper dependencies.
    ```bash
    npm install
    ```
2. Install Stancy as a dependency.
    ```bash
    npm install stancy --save-dev
    ```
3. Copy your content to your project.

    ```bash
    my-sapper-project/
        content/
3. Create a file to import Stancy and store the client details. Replace the `source` and `url`.

    __stancyClient.js__
    ```js
    import stancy from 'stancy';

    export default stancy(source).client(url);
    ```

    - `source` the directory your local content is stored
    - `url` the URL of the production API

5. Display data on page.

    __src/routes/about.svelt__
    ```html
    <script context="module">
        import client from "../../stancyClient.js";
        export async function preload() {
            const data = await api.get('pages/about');
            return { data };
        }
    </script>

    <script>
        export let data;
    </script>

    <svelte:head>
        <title>About</title>
    </svelte:head>

    <h1>About</h1>

    {@html data.content}
    ```
5. Test it by starting Sapper and viewing http://localhost:3000/about.

    ```bash
    npm run dev
    ```
6. To add support for hot reloading install `glob` and add the following code to _rollup.config.js_ and update __source__ with the path to your content.

    ```js
    import glob from 'glob';

    // ...

    export default {
        // ...
        server: {
            // ...
            plugins: [
                {
                    buildStart() {
                        var self = this;
                        var source = 'content/';
                        glob(source + '**/*', null, function(er, files) {
                            files.forEach((file) => {
                                self.addWatchFile(file);
                            });
                        });
                    }
                },
                // ...
            ]
        }
    };