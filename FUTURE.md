# Future

## Usage

- ### Starting a server

    ```js
    import stancy from 'stancy'

    stancy('content/').server(3000, '/api/)
    ```

- ### Starting a client

    ```js
    import stancy from 'stancy'

    var client = stancy('content/').client('http://domain.com/api/')
    ```

- ### Preprocessing data

    This can be useful for formatting dates, parsing markdown or sorting collections.

    ```js
    client.preprocess(({collection, item, content}) {
        content = marked(content)
    })
    ```

    - __`collection`__ returns every collection as an object with an array of _items_ (objects).
    - __`item`__ returns every item as an object with _fields_ (key value pairs).
    - __`content`__ returns the value of every field name _content_.

- ### Getting data

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

- ### Creating a database

    ```js
    var database = stancy('content/').database()
    ```

- ### Configure using config file

    __stancy.config.js__

    ```json
    {
        source: "content/",
        server: {
            port: 3000,
            subpath: "/API/"
        },
        client: {
            preview: "",
            production: "",
            preprocess: ({content}) => {
                content = marked(content)
            }
        }
    }
    ```

    The bare minimum for a client.

    ```json
    {
        source: "content/",
        client: {
            production: "",
            preprocess: ({content}) => {
                content = marked(content)
            }
        }
    }
    ```

- ### To specify custom configuration

    ```js
    stancy().config('src/stancy.config.js')
    ```


