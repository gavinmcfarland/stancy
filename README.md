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
[
	{
		"_index": 3,
		"_file": "site.md",
		"_type": "item",
		"_item": "site",
		"content": "<p>Site config</p>\n"
	},
	{
		"_index": 0,
		"_file": "jerry.md",
		"_type": "item",
		"_item": "jerry",
		"_collection": "users",
		"content": "<p>Jerry</p>\n"
	},
	{
		"_index": 1,
		"_file": "johanna.md",
		"_type": "item",
		"_item": "johanna",
		"_collection": "users",
		"content": "<p>Johanna</p>\n"
	},
	{
		"_index": 4,
		"_file": "users",
		"_type": "collection"
	}
]
```

You can request the content using the following requests:

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
  
- ### Preprocessing

  Seag will process the following formats `text`, `json`, `markdown` and `yaml`.


## Fields

- `_name` Came of the resource
- `_collection` Collection the resource belongs to
- `_item` Name of the item
- `_name` Type of resource
- `_index` The index of the resource in the collection

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