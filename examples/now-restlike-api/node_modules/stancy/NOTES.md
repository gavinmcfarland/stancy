In one go

```js
client.preprocess((data) => {
    var {collection, item, content} = data;

    if(collection) {
        collection.sort((a, b) => {
            if (a.date > b.date) {
                return 1;
            } else if (a.date < b.date) {
                return -1
            } else {
                return 0
            }
        })
    }

    if(item) {
        if(item.date) {
            item.date = format(date)
        }
    }

    if(content) {
        content = marked(content)
    }
    
    return (data = { collection, item, content });
})
```