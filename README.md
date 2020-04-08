## Folder API

A simple API for accessing flat file content in folders.

> This is a work in progress/experiment. Currently it just uses a dummy database to demonstrate the usage of the API.

## How Should it Work?

Files are stored in a folder and parsed (depending on their file type) into a JSON database which can be accessed using an API. The API structure roughly follows the structure of the content.

## Folder Structure

Below is an example project structure.

```bash
content/
  pages/
    posts/
      index.md
      my-post.md
      example-post.md
      another-post.md
    about.md
    services/
      index.md
      icon.png
    index.md
```

## Pages

You can access a page by calling the name directly `/pages/about`.

```json
{
  "id": "about",
  "content": "About page content"
}
```

You can also structure files so that pages are stored in folders. This can be useful if you want to store related content together.

For example if you have the following structure.

```
content/
  pages/
    services/
      index.md
      icon.png
```

You can access this by calling `/pages/services`.

```json
{
  "id": "services",
  "content": "Services page content"
}
```

## Collections

Each folder creates a collection which excludes index files and images.

For example using the following folder structure.

```bash
content/
  pages/
    posts/
      index.md
    about.md
    services/
      index.md
    index.md
```

You can access a list of pages by calling `/pages`.

```json
[
  {
    "id": 0,
    "title": "Home",
    "content": "this is some content",
    "slug": "index"
  },
  {
    "id": 1,
    "title": "About",
    "content": "some more content",
    "slug": "about"
  },
  {
    "id": 2,
    "title": "Posts",
    "content": "index content",
    "slug": "posts"
  },
  {
    "id": 3,
    "title": "Example Post",
    "content": "post content",
    "slug": "example-post",
    "pageId": 2,
    "parentId": "posts"
  },
  {
    "id": 4,
    "title": "Another Post",
    "content": "post content",
    "slug": "another-post",
    "pageId": 2,
    "parentId": "posts"
  },
  {
    "id": 5,
    "title": "Services",
    "content": "Services homepage",
    "slug": "services"
  }
]
```

You can access a list of children pages by calling `/pages/posts/children`.

```json
[
  {
    "id": "1",
    "title": "My Post",
    "content": "Post example 1"
  },
  {
    "id": "2",
    "title": "Another Post",
    "content": "Post example 2"
  },
  {
    "id": "3",
    "title": "Example Post",
    "content": "Post example 3"
  },
]
```

## Images

To access images of a page `/pages/services/images`.

```json
[
  {
    "pageId": "services",
    "src": "icon.png"
  }
]
```
