Create your content. Folders create collections. Files create items.

```
content/
	pages/
		home.md
		features.md
		about.md
	site.json
```

All you need to do, is pass in the source directory of your content and initiate a client.

```js
var client = stancy('content/').client()
```

To get content, just specify the end point which matches your content structure.

```js
client.get('pages/about')
```