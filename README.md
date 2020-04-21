# Stancy

Stancy uses static content (files and folders) to generate a database of collections and items. The database can be queried as a plain object, outputted as a json file, or served using an express server as an API. This is useful when building static sites which use frameworks like React, Vue, Svelte or Marko.

## Example

In this example, we'll look at how we can create a database from static files and folders which can be accessed using a REST api.

Start by creating a folder with some content, below is an example. Each top level file or folder creates a root endpoint.

```bash
content/
  site.json
  users/
    jerry.json
    hanna.json
    susan.json
```

Now start the server.

```js
stancy.serve('content/')
```

The API will generate endpoints, ussing the folder structure for both collections and items.

```
/:item
/:collection[/:item]
```

We can access the content using the following requests:

- [localhost:3000/site](http://localhost:3000/site)
- [localhost:3000/users](http://localhost:3000/users)
- [localhost:3000/users?role=editor](http://localhost:3000/users?role=editor)
- [localhost:3000/users/jerry](http://localhost:3000/users/jerry)

Items in collections can be filtered by querying by _field_. For example the query `?role=editor` will list all users who are editors.


## Features

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
    my-favourite-image.jpg
    my-favourite-image.yml
  ```

  This will create the following image meta data

  ```jsonc
  {
    // ...
    "images": [
      {
        "src": "/",
        "alt": "Me playing frisbee"
      }
    ]
  }
  ```

    
## Databases

To create a database.

```js
stancy.database(content)
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


- ### Create a database

    Specify where the content lives and create a database in memory.
  
    ```js
    const database = stancy.database('content/')
    ```

- ### Start a server

    Specify where the content lives and start the API server.

    ```js
    stancy.serve('content/')
    ```

- ### Write a database to file

    ```js
    stancy.write('content/')
    ```

- ### Get content

    To get content from a server

    ```js
    async function fetch() {
        return await stancy.get('users/jerry');
    }

    fetch().then((content) => {
    console.log(content)
    })

    // => {
    //   _url: 'users/jerry',
    //   "name": "Jerry",
    //   "age": "24",
    //   "role": "admin"
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