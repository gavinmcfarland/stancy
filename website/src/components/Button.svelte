<script>
	export let href
</script>

<style>
	.Button {
		margin-top: var(--em-2);
		display: inline-block;
		border-width: 2px;
		text-decoration: none;
		background: none;
		color: black;
		border-radius: 8px;
	}
</style>

<template lang="phtml">
{#if href}
	<a class="Button border p-1" {href}>
		<slot />
	</a>
{/if}
</template>
