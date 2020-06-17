<script context="module">
  import stancy from "stancy";
<<<<<<< HEAD
  import client from "api";
=======

  const client = stancy().client("https://stancy.now.sh/api/");

>>>>>>> refactored
  export async function preload({ params }) {
    const page = await client.get(`pages/about`);
    // console.log(page);
    return { page };
  }
</script>

<script>
  //   export let page;
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>About</h1>
<!-- {@html page.content} -->
