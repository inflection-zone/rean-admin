<script lang="ts">
	import { items } from '../../store/key.value.store';
	let Key;
	let Value;

	function handleSubmit() {
		const index = $items.findIndex((item) => item.Key === Key);
		if (index === -1) {
			items.create(Key, Value);
		} else {
			items.update(Key, Value);
		}
		// this.reset();
	}
</script>

<div class="flex gap-20">
	<label>
		<span>Key</span>
		<input
			class="input w-full ml-2"
			name="Key"
			type="text"
			bind:value={Key}
			placeholder="Add key"
			list="items"
		/>
	</label>
	<label>
		<span>Value</span>
		<input
			class="input w-full ml-2"
			name="Value"
			bind:value={Value}
			type="text"
			placeholder="Add value"
		/>
	</label>
	<button class="btn variant-soft-secondary" on:click|preventDefault={handleSubmit}>Add</button>
</div>

