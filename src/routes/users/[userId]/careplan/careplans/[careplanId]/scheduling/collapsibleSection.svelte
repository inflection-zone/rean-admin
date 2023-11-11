<script lang="ts">
	import Icon from '@iconify/svelte';
	import { slide } from 'svelte/transition';
	export let headerText;
	let expanded = false;
</script>

<div class="border border-secondary-100 dark:border-surface-700 p-2 min-w-[500px]">
	<div class="flex justify-between ">
		<div class="flex-start">{headerText}</div>
		<button
			class="btn p-2 hover:variant-soft-secondary flex-end"
			on:click={() => (expanded = !expanded)}
		>
			{#if expanded === false}
				<Icon icon="material-symbols:keyboard-arrow-down-rounded" class="text-lg" />
			{:else}
				<Icon icon="material-symbols:keyboard-arrow-up-rounded" class="text-lg" />
			{/if}
		</button>
	</div>
	{#if expanded}
		<div class="mt-2 p-2" transition:slide><slot /></div>
	{/if}
</div>
