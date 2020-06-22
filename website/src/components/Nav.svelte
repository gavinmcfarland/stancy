<script>
  export let segment;
</script>

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        home
      </a>
    </li>
    <li>
      <a
        aria-current={segment === 'features' ? 'page' : undefined}
        href="features">
        features
      </a>
    </li>
  </ul>
</nav>
