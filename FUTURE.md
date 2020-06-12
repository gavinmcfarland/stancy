## Future

### To start a server

```js
import stancy from 'stancy'

var stancy = stancy("content/")

stancy.server({
    port: 3000,
    subpath: "/api/"
})
```

### To start the client

```js
import stancy from 'stancy'

var client = stancy("content/").client({
    production: "http://domain.com/api/"
})
```

To preprocess data before being consumed by the frontend. This can be useful for formatting dates, parsing markdown or sorting collections.

```
client.preprocess(({collection, item, content}) => {
    content = marked(content)
})
```

- __`collection`__ returns every collection as an object with an array of _items_ (objects).
- __`item`__ returns every item as an object with _fields_ (key value pairs).
- __`content`__ returns the value of every field name _content_.

To get data.

```js
client.get('users/jerry').then(res => {
    console.log(res)
}).catch(err => { 
    console.log(err)
})

// => {
//   "_extension": ".json",
//   "url": 'users/jerry',
//   "name": "Jerry",
//   "age": "24",
//   "role": "admin",
//   "content": "<h1>Jerry</h1>"
// }
```

### To create a database

```js
var database = stancy("content/").database()
```





