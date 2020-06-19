# Vercel RESTlike API

This is an example of using Vercel to deploy a headless content management system which is accessable through a RESTlike API.

1. Install the dependencies

    ```
    npm install
    ```
2. Set up on Now following the CLI instructions

    ```
    vercel
    ```
3. Test on Now dev

    ```
    vercel dev
    ```
4. Visit the api at http://localhost:3000/api/. Try http://localhost:3000/api/pages/about. Note the port may be different to _3000_ if its already in use.

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
stancy('content/').serve(3000, '/api/');
```

## Managing and Accessing Content

Content is stored in the `content` folder. Take a look at the [Stancy](/README.md) readme for more details about managing and accessing this content.

