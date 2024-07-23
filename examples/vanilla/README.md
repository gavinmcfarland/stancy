# Vanilla HTML/JS

This is an example of integrating Stancy with plain old vanilla HTML and JS.

## Try this repo

Download the repo, install the dependencies and start the server to preview the HTML.

```bash
npm install
npm run serve
```

## Steps to recreate

1. Create a project directory and create a package.json file

```bash
mkdir my-website
npm init
```

2. Install Stancy as a dependency

```bash
npm install stancy --save-dev
```

3. Copy your content to your project

```
my-website/
    content/
```

4. Create a file to import Stancy and serve the content. Replace the source with the path to your content.

```js
// stancy.mjs
import stancy from 'stancy'

stancy(source).server(4001, '/')
```

5. Fetch and display data on the page

```js
// index.html
async function fetchData() {
	const res = await fetch(`http://localhost:4001/index`)
	const data = await res.json()

	if (res.ok) {
		return data
	} else {
		return {
			status: res.status,
			error: new Error('Could not load data'),
		}
	}
}

window.onload = async function () {
	const data = await fetchData()
	// Use whatever templating framework you prefer
	replaceTemplateStrings({ data })
}
```

## How does it work?

Stancy creates a "database" from your `content` files (see `stancy.js`). This is then served which can be accessed using the `fetch` function (see `public/index.html`). It's also possible to avoid using a server and just import the database directly.

Stancy applies some rules to make it easier to manage your content. For example, if you create a folder called `about` and include an `index` file within it, you can access it using `/about` rather than `about/index`. You can see a list of features supported on [Stancy's](https://github.com/gavinmcfarland/stancy) repo page.
