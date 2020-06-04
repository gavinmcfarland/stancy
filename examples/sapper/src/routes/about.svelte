<script context="module">
  import * as api from "api.js";
  export async function preload({ params }) {
    const { slug } = params;
    const page = await api.get(`pages/about`, null);
    return { page, slug };
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
