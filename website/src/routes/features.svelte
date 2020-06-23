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
    /* font-size: var(--font-size-em--1); */
    /* display: flex;
    flex-wrap: wrap; */
  }

  .wrapper {
    /* background: silver; */
    display: table;
  }

  .feature h2 {
    /* font-size: var(--font-size-h4); */
  }
</style>

<svelte:head>
  <title>Features</title>
</svelte:head>

<div text-gap="0" content>

  <h1>Features</h1>

  <div class="wrapper">
    <div class="container" column-gap="1" flex="wrap" row-gap="1">

      {#each page.features as feature}
        <div class="feature" border padding="1" width="1\2">
          {@html feature.content}
        </div>
      {/each}
    </div>
  </div>

</div>
