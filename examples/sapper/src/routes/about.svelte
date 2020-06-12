<script context="module">
  //   import stancy from "stancy";
  import client from "api";
  export async function preload({ params }) {
    const page = await client.fetch(`pages/about`);
    return { page };
  }
</script>

<script>
  export let page;
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>About</h1>
{@html page.content}
