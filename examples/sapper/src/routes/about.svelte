<script context="module">
  import * as stancy from "api";
  export async function preload({ params }) {
    const page = await stancy.get(`pages/about`);
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
