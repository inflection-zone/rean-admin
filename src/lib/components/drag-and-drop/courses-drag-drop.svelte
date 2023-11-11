<script>
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
  
	export let title;
	export let items;
	$: items;

	const flipDurationMs = 300;

	const handleDndConsider = (e) => (items = e.detail.items);
	const handleDndFinalize = (e) => (items = e.detail.items);
</script>

<div
	class="flex flex-col gap-2 p-2 border border-secondary-100 dark:border-surface-700 rounded min-h-[100px]"
>
	<div class="font-semibold">{title}</div>
	<section
		class="grow"
		use:dndzone={{ items: items, flipDurationMs }}
		on:consider={handleDndConsider}
		on:finalize={handleDndFinalize}
	>
		{#each items as item (item.id)}
			<div class="px-1 py-0.5" animate:flip={{ duration: flipDurationMs }}>
				{item.Name}
			</div>
		{/each}
	</section>
</div>
