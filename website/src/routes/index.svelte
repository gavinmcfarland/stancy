<script context="module">
  import client from "../../stancyClient.js";
  import {
    FileIcon,
    FolderIcon,
    BoxIcon,
    CloudIcon
  } from "svelte-feather-icons";

  export async function preload({ params }) {
    const page = await client.get("pages/home");
    return { page };
  }
</script>

<script>
  export let page;
</script>

<svelte:head>
  <title>{page.title}</title>
</svelte:head>

<div>
  <div row-gap="1" flex="wrap">
    <h1 text="center">{page.title}</h1>

    <div flex column-gap="2" row-gap="3">
      <div>
        <span style="margin: auto; display: table;">
          <FolderIcon size="64" />
        </span>
        <p>
          Organise your content just using files and folders. Folders create
          collections and files create items.
        </p>
      </div>
      <div>
        <span style="margin: auto; display: table;">
          <FileIcon size="64" />
        </span>
        <p>
          Easily deliver content from static folders and files using JSON, YAML,
          TEXT and Markdown.
        </p>
      </div>

      <div>
        <span style="margin: auto; display: table;">
          <BoxIcon size="64" />
        </span>
        <p>
          Easily asbtract content formatting by processing it on the client.
          Sort collections, format dates, and parse markdown.
        </p>
      </div>
      <div>
        <span style="margin: auto; display: table;">
          <CloudIcon size="64" />
        </span>
        <p>
          Get and filter data easily using a simple RESTlike API that follows
          the sturcture of your folders.
        </p>
      </div>
    </div>

    <div text="center">
      <a class="Button" href="#">View on Github</a>
    </div>
  </div>

  <hr width="viewport" />
  <div>
    <div flex>
      <h2 width="1\3">Usage</h2>
      <div width="1\2">
        <p>
          Create your content. Folders create collections. Files create items.
        </p>
        <pre>
          <code>
            {@html `content/
	pages/
		home.md
		features.md
		about.md
	site.json`}
          </code>
        </pre>
        <p>
          All you need to do, is pass in the source directory of your content
          and initiate a client.
        </p>
        <pre>
          <code>
            {@html `var client = stancy('content/').client()`}
          </code>
        </pre>

        <p>
          To get content, just specify the end point which matches your content
          structure.
        </p>
        <pre>
          <code>
            {@html `client.get('pages/about')`}
          </code>
        </pre>
      </div>
    </div>

    <hr width="viewport" />

    <div flex>
      <h2 width="1\3">Features</h2>
      <div width="1\2">
        <div>
          <h3>Server and client</h3>
          <p>
            Easily serve content from static folders and files, and fetch
            content.
          </p>
        </div>
        <div>
          <h3>Singular Folders</h3>
          <p>
            Using a singular name for a folder will create an item (instead of a
            collection). The files contained in that folder become fields of
            that item.
          </p>
        </div>
        <div>
          <h3>Index File</h3>
          <p>
            Use an index file inside a folder to create an item and a
            collection. The files contained inside that folder become children
            of that item. This is useful if you prefer to organise using folders
            or if you want to create an index page for a group of related
            content.
          </p>
        </div>
        <div>
          <h3>Hidden</h3>
          <p>
            Prepend an underscore
            <code>_</code>
            to hide a file or folder. In the case of hiding a folder, this will
            also hide all it's contents.
          </p>
        </div>
      </div>
    </div>

  </div>
</div>
