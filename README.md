# Seag

Seag uses static content (files and folders) to create a database of collections and items. The database can be queried as a plain object, outputted as a json file, or served using an express server. This is useful when building static sites which use frameworks like React, Vue, Svelte or Marko.

## Example

Start by creating a folder with some content. Below is an example. Each top level file or folder creates a root endpoint.

```bash
content/
  site.json
  users/
    jerry.json
    johanna.json
```

Now start the server <mark>coming soon</mark>

```js
seag.serve('content/')
```

You can access the content using the following requests:

- [localhost:3000/site](http://localhost:3000/site)
- [localhost:3000/users](http://localhost:3000/users)
- [localhost:3000/users/jerry](http://localhost:3000/users/jerry)

## Features

- ### Singular Folders
  
  When a singular name is used for a folder it will create an item (instead of a collection). The files contained in that folder become fields of that item.

---

- ### Index File

  Placing an index file inside a folder will turn it into an item. The files contained inside that folder become children of that item. This is useful if you prefer to organise using folders or you want to create an index page for a group of related content.

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

  Prepend an underscore to hide a file or folder.

  ```
  _file-is-hidden.md
  _folder-is-hidden/
  ```

---

- ### Parsing

  Seag will parse the following formats `text`, `json`, `markdown` and `yaml`.

---

- ### File Types <mark>coming soon</mark>

  Seag supports the following file types.

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

  ```json
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

    
## Fields

Using a query language of your choice you can filter and display the data you need.

- `_name` Name of the resource
- `_collection` Collection the resource belongs to
- `_item` Name of the item
- `_index` The index of the resource in the collection or dataset
- `_type` The type of resource. Named after the folder or file.
- `url` The url to the resource. <mark>coming soon</mark>
- `source` The path to the folder containing the file. <mark>coming soon</mark>

## Advanced

- ### Create a database
  
  ```js
  seag.database('content/')
  ```

---

- ### Write a database to file

  ```js
  seag.write('content/')
  ```

---

- ### Start a server

  ```js
  seag.serve('content/')
  ```

## Installation

Add the npm package to your project.

```bash
npm install seag
```

In your application specify where the content lives and start the API server.

```js
import seag from 'seag'

seag.serve('content/')
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