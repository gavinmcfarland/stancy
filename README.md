# Seag

> This is a work in pogress. Please let me know if you encounter any issues.

Uses static content (files and folders) to create a database of collections and items. The database can be accessed as a plain object, outputted as a json file, or served using an express server. This is useful for building static sites which use frameworks like React, Vue, Svelte or Marko.

## Example

Start by creating a folder with some content. Below is an example. Each top level file or folder creates a root endpoint.

```bash
content/
  site.json
  users/
    jerry.json
    johanna.json
```

Now to start the server

```js
seag.server('content/')
```

This will let you access to the following database

```json
{
  "site": {
    "_file": "site.md",
    "domain": "mydomain.com",
    "description": ""
  },
  "users": [
    {
      "_id": 0,
      "_file": "jerry.md",
      "name": "Jerry",
      "role": "admin"
    },
    {
      "_id": 1,
      "_file": "johanna.md",
      "name": "Johanna",
      "role": "admin"
    }
  ]
}
```

You can request the content using the following calls:

- [localhost:3000/site](http://localhost:3000/site)
- [localhost:3000/users](http://localhost:3000/users)
- [localhost:3000/users/jerry](http://localhost:3000/users/jerry)

## Features

- ### Singular Folders
  
  When a singular name is used for a folder an item will be created (instead of a collection). The files contained in that folder will become fields in that item.

---

- ### Index File

  Placing an index file inside a folder will turn it into an item. The files contained inside that folder become children of that item.

- ### Hidden

  Prepend an underscore to hide a file or folder.

  ```
  _hidden/
  ```

---

- ### Search

    ```
    pages
    pages.about
    pages[item="about"]
    ```

- ### Preprocessing

  Seag will process the following formats `text`, `json`, `markdown` and `yaml`.


## Advanced

- ### Create a database
  
  ```js
  seag.database('content/`)
  ```

---

- ### Write a database to file

  ```js
  seag.write('content/`)
  ```

---

- ### Start a server

  ```js
  seag.server('content/`)
  ```

## Installation

Add the npm package to your project.

```bash
npm install seag
```

In your application specify where the content lives and start the API server.

```js
import seag from 'seag'

seag.start('content/')
```

To get content

```js
async function getContent() {
    return await seag.get('pages/about', null);
}

getContent().then((content) => {
  console.log(content)
})

// => {
//   _id: 0,
//   _title: 'about.md',
//   content: 'Some about content'
// }
```

## Development

To install the dependencies

```
npm install
```

To run the demo

```
npm run demo
```