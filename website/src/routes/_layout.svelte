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

<div class="Site" padding-inline="3" text-gap="1">
	<div class="App">
		<Nav {segment} />

		<main class="Content">
			<slot />
		</main>

		<Footer />
	</div>
</div>
