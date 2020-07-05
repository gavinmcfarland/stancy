<script context="module">
	import client from '../../stancyClient.js'
	import Button from '../components/Button.svelte'

	export async function preload({ params }) {
		const page = await client.get('home')
		return { page }
	}
</script>

<script>
	export let page
</script>

<style>
	.highlights {
		justify-content: space-between;
	}
	.highlights > * {
		flex-grow: 1;
		flex-basis: clamp(20ch, 38vw, 16rem);
	}
	.usage > *,
	.features > * {
		flex-grow: 1;
		flex-basis: clamp(20ch, 40vw, 37rem);
	}
	.highlights > :last-child {
		/* flex-grow: 0; */
	}

	/* Tempory fix for orphined item */
	.highlights::after {
		display: block;
		content: '';
		flex-grow: 1;
		height: 0;
		margin: 0;
		/* flex-basis: clamp(20ch, 38vw, 16rem); */
		width: clamp(20ch, calc(75% - 96px), 133rem);
	}

</style>

<svelte:head>
	<title>{page.site.title}</title>
</svelte:head>

<template lang="phtml">
<div>
	<div class="text-gap-3">
		<h1 class="text-center">{page.site.title}</h1>

		<div class="highlights flex-wrap column-gap-2 row-gap-3">
			{#each page.highlights as { svg, description }}
				<div>
					<span class="mx-auto display-table">
						{@html svg}
					</span>
					<p>{description}</p>
				</div>
			{/each}
		</div>

		<div class="text-center">
			<Button href="https://github.com/limitlessloop/stancy">
				View on Github
			</Button>
		</div>
	</div>

	<hr class="width-viewport" />

	<div>
		<div class="usage flex-wrap">
			<h2 class="width-1\3">Usage</h2>
			<div class="width-1\2">
				{@html page.usage.content}
			</div>
		</div>

		<hr class="width-viewport" />

		<div class="features flex-wrap">
			<h2 class="width-1\3">Features</h2>
			<div class="width-1\2">
				{@html page.features.content}
			</div>
		</div>

	</div>
</div>
</template>
