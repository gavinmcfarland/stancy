<script context="module">
  import client from "../../stancyClient.js";

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

<h1>{page.title}</h1>
{@html page.content}
