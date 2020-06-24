<script context="module">
	import client from '../../stancyClient.js'
	import Button from '../components/Button.svelte'
	import {
		FileIcon,
		FolderIcon,
		BoxIcon,
		CloudIcon,
	} from 'svelte-feather-icons'

	export async function preload({ params }) {
		const page = await client.get('site')
		const usage = await client.get('usage')
		const features = await client.get('features')
		return { usage, page, features }
	}
</script>

<script>
	export let page
	export let usage
	export let features
</script>

<svelte:head>
	<title>{page.title}</title>
</svelte:head>

<div>
	<div text-gap="3">
		<h1 text="center">{page.title}</h1>

		<div flex column-gap="2" row-gap="3">
			{#each page.highlights as { svg, description }}
				<div>
					<span style="margin: auto; display: table;">
						{@html svg}
					</span>
					<p>{description}</p>
				</div>
			{/each}
		</div>

		<div text="center">
			<Button href="https://github.com/limitlessloop/stancy">
				View on Github
			</Button>
		</div>
	</div>

	<hr width="viewport" />
	<div>
		<div flex>
			<h2 width="1\3">Usage</h2>
			<div width="1\2">
				{@html usage.content}
			</div>
		</div>

		<hr width="viewport" />

		<div flex>
			<h2 width="1\3">Features</h2>
			<div width="1\2">
				{@html features.content}
			</div>
		</div>

	</div>
</div>
