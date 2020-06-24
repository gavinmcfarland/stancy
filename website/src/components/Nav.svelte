<script>
	export let segment
</script>

<style>
	.Nav {
		border-bottom: 1px solid;
		padding-top: var(--em-1);
		padding-bottom: var(--em-1);
	}
</style>

<header class="Nav" width="viewport">
	<div class="wrapper" flex column-gap="1">
		<a aria-current={segment === undefined ? 'page' : undefined} href=".">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="32px"
				height="32px"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-folder ">
				<path
					d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0
					0 1 2 2z" />
			</svg>
		</a>

		<!-- <ul flex="shrink" column-gap="1">
			<li>
				<a
					aria-current={segment === 'features' ? 'page' : undefined}
					href="features">
					Features
				</a>
			</li>
		</ul> -->
	</div>
</header>
