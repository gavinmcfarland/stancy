# Stancy

![npm](https://img.shields.io/npm/v/stancy)

Stancy uses static files and folders to generate a database of collections and items. The database can be queried as a plain object, outputted as a json file, or served using an express server as an API. This is useful for building static sites which use frameworks like React, Vue, Svelte or Marko. Stancy is unbiased about how you use it and can be customised to suit different use-cases.

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

In this example we've created a file `site.json` which stores key information about our site, some `pages`, and a `blog`.

Now start the server.

```js
stancy('content/').serve()
```

The API generates endpoints for collections and items following the structure of the directory.

```
/:item
/:collection[/:item]
```

We can access the content using the following requests:

- [localhost:3000/site](http://localhost:3000/site)
- [localhost:3000/pages](http://localhost:3000/pages)
- [localhost:3000/pages?status=draft](http://localhost:3000/pages?status=draft)
- [localhost:3000/pages/about](http://localhost:3000/pages/about)

Items in collections can be filtered by querying their _fields_. For example the query `?status=draft` will list all draft pages .


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

- ### File Types <mark>coming soon</mark>

  The following file types are supported.

  - Archives
  - Audio
  - Code
  - Documents
  - Images
  - Videos

---

- ### Meta Data <mark>coming soon</mark>

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

    
## Databases

To create a database.

```js
stancy('content/').database()
```

- `content`: a _String_ which points to the directory of your static content.



### Fields

Using a query language of your choice you can filter and show data using the following field names.

#### Private

- `_name` Name of the resource
- `_collection` Collection the resource belongs to
- `_index` The index of the resource in the collection or dataset
- `_type` The type of resource. Named after the folder or file.
- `_source` The path to the folder containing the file.


#### Public

- `url` The url to the resource.

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

- ### Start a server

    Specify where the content lives and start the API server.

    ```js
    stancy('content/').serve()
    ```

- ### Get content

    To get content from a server

    ```js
    async function get() {
        return await stancy().get('http://localhost:3000', 'users/jerry');
    }

    get().then((content) => {
        console.log(content)
    })

    // => {
    //   _url: 'users/jerry',
    //   "name": "Jerry",
    //   "age": "24",
    //   "role": "admin"
    // }
    ```

- ### Create a database

    Specify where the content lives and create a database in memory.
  
    ```js
    const database = stancy('content/').database()
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

To build and test demo

```
npm run test
```