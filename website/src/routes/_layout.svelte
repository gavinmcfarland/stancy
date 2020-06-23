<script>
  import Nav from "../components/Nav.svelte";
  import Footer from "../components/Footer.svelte";

  export let segment;
</script>

<style>
  .Content {
    border-top: 1px solid;
    margin-top: 0;
  }
</style>

<div class="Site" padding-inline="3">
  <div class="App">
    <Nav {segment} />

    <main class="Content" width="viewport">
      <slot />
    </main>

    <Footer />
  </div>
</div>
