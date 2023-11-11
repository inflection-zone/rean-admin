<script lang="ts">
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	///////////////////////////////////////////////////////////////////////////////////////////////

	export let headerText;
	export let itemsCount;
	export let addRoute = undefined;
	export let editRoute = undefined;
	export let src = undefined;
	export let viewRoute = undefined;
	let expanded = false;
	const dispatch = createEventDispatcher();
	const handlelDeleteClick = async (id) => dispatch('onDeleteClick', { id: id });
</script>

<div class="border border-secondary-100 dark:border-surface-700 p-2 min-w-[500px]">
	<div class="flex gap-4 items-center">
		<div class="flex gap-2 items-center grow">
			<img class="w-8" {src} alt="" />
			<a href={viewRoute}>{headerText}</a>
		</div>
		<p>{itemsCount}</p>
		<a href={addRoute} class="btn p-2 -my-1 hover:variant-soft-primary">
			<Icon icon="material-symbols:add-rounded" class="text-lg" />
		</a>
		<a href={editRoute} class="btn p-2 -my-1 group hover:variant-soft-primary">
			<Icon icon="material-symbols:edit-outline" class="text-lg" />
		</a>
		<div>
			<Confirm
				confirmTitle="Delete"
				cancelTitle="Cancel"
				let:confirm={confirmThis}
				on:delete={(id) => handlelDeleteClick(id)}
			>
				<button
					on:click|once={(id) => confirmThis(handlelDeleteClick, id)}
					class="btn p-2 -my-1 hover:variant-soft-error"
				>
					<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
				</button>
				<div slot="title">Delete</div>
				<div slot="description">Are you sure you want to delete, this will leads to loss of data in course?</div>
			</Confirm>
		</div>
		<button
			class="btn p-2 -my-1 hover:variant-soft-secondary "
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
