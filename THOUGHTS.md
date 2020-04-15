# Static Endpoint API Generator

Use files and folders to automatically create endpoints to access their content. Each top level file or folder creates a root endpoint for different resources.

## Usage

Create a file to create a resource, or a plural sounding folder containing files to create a collection.

```
:resource
:collection[/:resource]
```

### Creating a resource

Creating a file called `site.md`.
```
site.md
```
Will create a resource which can be accessed using `GET site`.
```json
{
    "id": 0,
    "title": "Turtles Are Cool",
    "domain": "turtlesarecool.com"
}
```

### Creating a collection

Creating a folder with several files.

```
users/
  jeffery.md
  johanna.md
```

Will create a collection of resources which can be access using `GET users`.

```json
[
    {
        "id": 1,
        "title": "",
        "content": {}
    },
    {
        "id": 2,
        "title": "",
        "content": {}
    }
]
```

Calling `GET users/jeffery` will return:

```json
{
    "id": 1,
    "title": "",
    "content": {}
}
```

## Features

### Singular Folders

When a singular name is used for a folder a resource will be created (instead of a collection). The files contained in that folder will become fields in that resource.

### Index File or Folder

Placing an index file or folder inside a folder will turn it into a resource. The files contained in that folder become children of that resource.

### Filtering

You can filter using any feild by using the field as a parameter.

```
?url=:url
```

For example: `pages?url="services/web-design"/images`

### Fields

You can show the data for any field by chosing which field to show.

```
?field=:field
```

For example: `pages?field=children`

### Order

Prepend a number to the file or folder to change its order.

```
01_about/
02_services/
03_work/
```

### Hidden

Prepend an underscore to hide a file or folder.

```
_hidden/
```

## Extend

### Fields

You can programmatically create fields.

```js
seag.collection('pages').field((item, collection) => {

  // Assign a URL to each page
	if(item.name === 'home') item.url = '/'
  else item.url = '/' + item.path
  
  // Provide a tag for which collection the endpoint is part of
  item.collection = collection.name
	
	return item
})
```

## Examples

Some examples of endpoints you can create.

### Site

```
site
```

### Pages

```
pages?url=:url
pages?url=:url/images/
pages?url=:url/files/
```

### Users

```
users
users/:user
users/repos/
```

### Images

```
images
```

### Config

```
config/preferences
config/user
config/colours
```

### Movies

```
movies/:language/:genre/:year/:movie
```

## Ideas

1. Add a forward slash to the end of a folder to make the items inside a collection (or the same for a file).
2. All resources have to be folders.
3. Add a dot to the end of a folder to make it a resource rather than a collection.
4. If a folder has an index file, it is presumed to be a resource.
5. If the name of a folder is not a plural rest it as an object.
6. Need a way to let user add what data can be included in resource, perhaps by adding a file to the folder.
7. Need a way to let users add fields to individual resources
8. Need a way to let users create custom routes

# Future

1. Option just to build database
2. Option to query database without server
3. Pull out all images/files, etc
4. Different libraries for parsing different files, yaml, markdown, jsonnet, json.

```js
fetch('site')
fetch('pages/about')
fetch('pages/posts')
fetch('pages/posts/')
```

```
site.md
pages/
  /.md
  about.md
  services/
    index.md
    web-design.md
    graphic-design.md
    seo.md
    _company-names.md
  posts/
    index.md
    my-first-post.md
    _drafts/
      my-second-post.md
users/
  jeffery.md
  johanna.md
repos/
  test
```

## Example Database

```
{
    users: [

    ],
    pages: [
        {
            url: "/",
            source:
        }
    ],
    site: {

    }
}
```


```
pages/
  home/
  contact/
  about/
  services/
    index.md
    images/
  posts/
    index.md
    my-first-post.md


movies/
  action/
  thriller/
  romcom/
  comedy/

```