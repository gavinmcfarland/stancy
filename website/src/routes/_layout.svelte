<script>
	import Nav from '../components/Nav.svelte'
	import Footer from '../components/Footer.svelte'

	export let segment
</script>

<style>
	.Content {
		margin-top: 0;
	}
</style>

<template lang="phtml">

<div class="Site pr-3 pl-3 text-gap-1">
	<div class="App">
		<Nav {segment} />

		<main class="Content">
			<slot />
		</main>


		<Footer />
	</div>
</div>

</template>
