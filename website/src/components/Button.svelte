<script>
	export let href
</script>

<style>
	.Button {
		margin-top: var(--em-2);
		display: inline-block;
		border-width: 2px;
		padding: var(--em--1) var(--em-0);
		text-decoration: none;
		background: none;
		color: black;
		border-radius: 8px;
	}
</style>

{#if href}
	<a class="Button" border {href}>
		<slot />
	</a>
{/if}
