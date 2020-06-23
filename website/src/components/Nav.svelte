<script>
  export let segment;
</script>

<style>
  .Nav {
    padding-left: inherit;
    padding-right: inherit;
    padding-top: var(--em-1);
    padding-bottom: var(--em-1);
  }
</style>

<header class="Nav" width="viewport" flex column-gap="1">
  <a aria-current={segment === undefined ? 'page' : undefined} href=".">Home</a>
  <ul flex="shrink" column-gap="1">
    <li>
      <a
        aria-current={segment === 'features' ? 'page' : undefined}
        href="features">
        Features
      </a>
    </li>
  </ul>
</header>
