# Stancy

![npm](https://img.shields.io/npm/v/stancy)

Stancy uses static files and folders to generate a database of collections and items. The database can be queried as a plain object, outputted as a json file, or served using an express server for a RESTlike API. This is useful for building static sites which use frameworks like React, Vue, Svelte or Marko. Stancy is unbiased about how you use it and can be customised to suit different use-cases.

## Example

In this example, we'll look at how we can create a database from static files and folders which can be accessed using an API for a website.

Start by creating a folder with some content, below is an example. Each top level file or folder creates a root endpoint.

```bash
content/
  site.json
  pages/
    home.md
    about.md
    services.md
    blog/
        index.md
        my-first-post.md
        another-post.md
```

Here we've created a file `site.json` which stores key information about our site, some `pages`, and a `blog`.

Now start the server.

```js
stancy('content/').serve(3000, '/api/')
```

The API generates endpoints for collections and items following the structure of the directory.

```
/:item
/:collection[/:item]
```

We can access the content using the following requests:

- [localhost:3000/api/site](http://localhost:3000/api/site)
- [localhost:3000/api/pages](http://localhost:3000/api/pages)
- [localhost:3000/api/pages?status=draft](http://localhost:3000/api/pages?status=draft)
- [localhost:3000/api/pages/about](http://localhost:3000/api/pages/about)

Items in collections can be filtered by querying their _fields_. For example the query `?status=draft` will list all draft pages.

Check out the [examples](/examples).

## Installation

Add the npm package to your project.

```bash
npm install stancy --save-dev
```

Import stancy in your application.

```js
import stancy from 'stancy'
```

## Usage

### Starting a server

```js
stancy('content/').server(3000, '/api/')
```

### Starting a client

```js
var client = stancy('content/').client('http://domain.com/api/')
```

### Preprocessing data

This can be useful for formatting dates, parsing markdown or sorting collections.

```js
client.preprocess(({collection, item, content, database}) {
    content = marked(content)
})
```

- __`collection`__ returns every collection as an object with an array of _items_ (objects).
- __`item`__ returns every item as an object with _fields_ (key value pairs).
- __`content`__ returns the value of every field name _content_.

### Getting data

```js
client.get('users/jerry').then(res => {
    console.log(res)
}).catch(err => { 
    console.log(err)
})
```

Example response

```json
{
    "_extension": ".json",
    "url": "users/jerry",
    "name": "Jerry",
    "age": "24",
    "role": "admin",
    "content": "<h1>Jerry</h1>"
}
```

### Creating a database

```js
var database = stancy('content/').database()
```

### Configure using config file

__stancy.config.js__

```js
{
    source: 'content/',
    client: {
        production: 'https://stancy.now.sh/api/',
        token: 'T89ALS90',
        preprocess: ({content}) => {
            content = marked(content)
        }
    }
}
```

### Specify custom configuration

```js
stancy().config('src/stancy.config.js')
```

## Features

- ### Collections and Items

  Collections are created by grouping files with a folder.\
  Items are created by files.

---

- ### Singular Folders
  
  When a singular name is used for a folder it will create an item (instead of a collection). The files contained in that folder become fields of that item.

---

- ### Index File

  Placing an index file inside a folder will create an item. The files contained inside that folder become children of that item. This is useful if you prefer to organise using folders or if you want to create an index page for a group of related content.

  ```bash
  # Creates a collection of items
  collection/
    item-one.md
    item-two.md
    item-three.md

  # Creates an item
  item/
    index.md
  ```

---

- ### Hidden

  Prepend an underscore to hide a file or folder. In the case of hiding a folder, this will also hide all it's contents.

  ```
  _file-is-hidden.md
  _folder-is-hidden/
  ```

---

- ### Parsing

  Stancy will parse the following formats `text`, `json`, `markdown` and `yaml`.

---

- ### File Types <mark>(coming soon)</mark>

  The following file types are supported.

  - Archives
  - Audio
  - Code
  - Documents
  - Images
  - Videos

---

- ### Meta Data <mark>(coming soon)</mark>

  You can add meta data to images by creating a data file with a matching name.

  ```
  my-first-post/
    playing-frisbee.jpg
    playing-frisbee.yml
  ```

  This will create the following image meta data

  ```jsonc
  {
    // ...
    "images": [
      {
        "src": "/static/playing-frisbee.jpg",
        "alt": "Me playing frisbee"
      }
    ]
  }
  ```

---

- ### Built in Fields

    If you create a database you can filter and show data using a query language of your choice using the following field names.

    #### Private

    - `_name` Name of the resource
    - `_collection` Collection the resource belongs to
    - `_index` The index of the resource in the collection or dataset
    - `_type` The type of resource. Named after the folder or file.
    - `_source` The path to the folder containing the file.


    #### Public

    - `url` The url to the resource.


## Development

To install the dependencies

```
npm install
```

To run the demo server

```
npm run demo
```

To run tests

```
npm run test
```
