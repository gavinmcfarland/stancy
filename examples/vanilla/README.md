# Example using vanilla HTML/JS

## To use this repo

Download this repo, install the dependencies and start the server to preview the HTML.

```bash
npm install
npm run serve
```

## How does it work?

Stancy creates a "database" from your `content` files (see `stancy.js`). This is then served which can be accessed using the `fetch` function (see `public/index.html`). It's also possible to avoid using a server and just import the database directly.

Stancy applies some rules to make it easier to manage your content. For example, if you create a folder called `about` and include an `index` file within it, you can access it using `/about` rather than `about/index`. You can see a list of features supported on [Stancy's](https://github.com/gavinmcfarland/stancy) repo page.
