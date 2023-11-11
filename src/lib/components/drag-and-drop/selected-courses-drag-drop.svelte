<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import { selectedItems } from '$lib/store/general.store';

	export let title;
	export let sletectItems;
	$: sletectItems;

	const flipDurationMs = 300;

	const handleDndConsider = (e) => (sletectItems = e.detail.items);

	const handleDndFinalize = (e) => {
		sletectItems = e.detail.items;
		let itemIds = sletectItems.map((item) => item.id);
		console.log('courseIds', itemIds);
		selectedItems.set(itemIds);
	};
</script>

<div
	class="flex flex-col gap-2 p-2 border border-secondary-100 dark:border-surface-700 rounded min-h-[100px]"
>
	<div class="font-semibold">{title}</div>
	<section
		class="grow"
		use:dndzone={{ items: sletectItems, flipDurationMs }}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
	>
		{#each sletectItems as item (item.id)}
			<div class="px-1 py-0.5" animate:flip={{ duration: flipDurationMs }}>
				{item.Name}
			</div>
		{/each}
	</section>
</div>
