# Now RESTlike API

This is an example of using Now to deploy a headless content management system which is accessable through a RESTlike API.

1. Install the dependencies

    ```
    npm install
    ```
2. Link to a now project and following the CLI instructions

    ```
    now
    ```
3. Test the api at http://localhost:3000/api/

    ```
    now dev
    ```

## Changing the subpath

To change the subpath where the API is accessible from, just update __now.json__ and __api.js__ from `/api/` to the subpath you would like.

__now.json__
```jsonc
{
    // ...
	"rewrites": [ { "source": "/api/(.*)", "destination": "/api.js" } ]
}
```

__api.json__
```js
// ...
stancy('content/').serve('3000', '/api/');
```

## Managing and Accessing Content

Content is stored in the `content` folder. Take a look at the [Stancy]() docs for more details about managing and accessing this content.

