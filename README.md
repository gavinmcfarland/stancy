# Folder API

A minimalistic API for accessing flat file content.

It turns all top-level folders and files in a directory into collections which can be accessed by calling `/:collection[/:item]`. It does this by converting the files and folders into an objects which can be accessed using the API.

> This is a work in pogress. Please let me know if you encounter any issues.

For example with the following content:

```bash
content/
  site.md
  users/
    jerry.md
    johanna.md
  pages/
    about.md
    services/
      index.md
    posts/
      index.md
      my-first-post.md
      how-to-write-code.md
      things-come-in-threes.md
```

You can request content using the following calls:

- [localhost:3000/site](http://localhost:3000/site)
- [localhost:3000/users](http://localhost:3000/users)
- [localhost:3000/users/jerry](http://localhost:3000/users/jerry)
- [localhost:3000/pages](http://localhost:3000/pages)
- [localhost:3000/pages/about](http://localhost:3000/pages/about)
- [localhost:3000/pages/posts](http://localhost:3000/pages/posts)
- [localhost:3000/pages/posts/children](http://ocalhost:3000/pages/posts/children)

## Installation

Add the npm package to your project.

```bash
cd my-project
npm install https://github.com/limitlessloop/folder-api.git
```

In your application specify where the content lives and start the API server.

```js
// app.js
const api = require(`./node_modules/folder-api/index.js`)

api.start('content/')
```

To get content

```js
async function getContent() {
    return await api.get(`pages/about`, null);
}

getContent().then((content) => {
  console.log(content)
})

// => {
//   id: 0,
//   title: 'about.md',
//   content: 'Some about content',
//   slug: 'about'
// }
```

## Development

To install the dependencies

```
npm install
```

To run the API

```
npm run demo
```