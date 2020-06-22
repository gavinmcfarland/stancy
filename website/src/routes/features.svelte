<script context="module">
  import client from "../../stancyClient.js";

  export async function preload({ params }) {
    const page = await client.get("pages/features");
    return { page };
  }
</script>

<script>
  export let page;
</script>

<style global>
  h1 {
    /* font-size: var(--font-size-h3); */
  }
  .container {
    font-size: var(--font-size-em--1);
    /* display: flex;
    flex-wrap: wrap; */
    display: flex;
    flex-wrap: wrap;
  }
  .container > :first-child {
    margin-top: unset;
  }
</style>

<svelte:head>
  <title>Features</title>
</svelte:head>

<div text-gap="2">

  <h1>Features</h1>

  <div class="container">

    {#each page.features as feature}
      <div class="feature" width="1\2">
        {@html feature.content}
      </div>
    {/each}
  </div>

</div>
