# Future Ideas and Thoughts

You can use files and folders to automatically create endpoints to access their content. Each top level file or folder creates an endpoint for a different resource.

## Usage

Create a file to create an individual resource or a plural sounding folder containing files to create a collection.

__Individual Resource__
```
site.md
```

Will create a site resource which can be accessed using `GET site`.

```json
{
    "id": 0,
    "title": "Turtles Are Cool",
    "domain": "turtlesarecool.com"
}
```

__Collection of Resources__
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

#### Params

You can filter by any feild using the field as a parameter.

- `?url=:url`

For example: `pages?url="services/web-design"/images`

You can show the data for any field by chosing which field to show.

- `?field=:field`

For example: `pages?field=children`

#### Order

Prepend a number to the file or folder to change its order.

```
01_about/
02_services/
03_work/
```

#### Hidden

Prepend an underscore to hide a file or folder.

```
_hidden/
```

#### Singular or Plural
Folders with a singular name are treated as individual resources. Folders with a plural name are treated as collections.

However if a folder contains a file called `index.md` it is treated as an individual resource. All the files contained by the folder will because children of that resource.

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
  

## Ideas

1. Add a forward slash to the end of a folder to make the items inside a collection (or the same for a file).
2. All resources have to be folders.
3. Add a dot to the end of a folder to make it a resource rather than a collection.
4. If a folder has an index file, it is presumed to be a resource.
5. If the name of a folder is not a plural rest it as an object.
6. Need a way to let user add what data can be included in resource, perhaps by adding a file to the folder.

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