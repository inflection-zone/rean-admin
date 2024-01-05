<script lang="ts">
	import Icon from '@iconify/svelte';

	export let optionValueStore = [{ Text: '' }];

	// const addOptionField = () => (optionValueStore = [...optionValueStore, { Text: '' }]);
	// const removeOptionField = () =>
	// 	(optionValueStore = optionValueStore.slice(0, optionValueStore.length - 1));
</script>

<div class="border dark:border-surface-700 flex flex-col rounded my-2 p-2 gap-2">
	{#each optionValueStore as v, i}
		<div class="flex items-center gap-2">
			<input
				type="text"
				class="input"
				name="options"
				disabled
				bind:value={optionValueStore[i].Text}
				placeholder="Add option here..."
			/>
			<!-- <button class="btn p-2 variant-soft-error" on:click={removeOptionField}>
				<Icon icon="material-symbols:close-rounded" />
			</button> -->
		</div>
	{/each}

	<!-- <button class="btn btn-sm variant-soft-secondary" on:click|preventDefault={addOptionField}>
		Add Option
	</button> -->
</div>
