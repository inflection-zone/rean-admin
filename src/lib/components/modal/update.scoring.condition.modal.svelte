<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import { showScoringConditionModal } from '../../store/general.store';
	export let resolutionScore = undefined;
	let dialog;

	$: if (dialog && $showScoringConditionModal) dialog.showModal();

	const dispatch = createEventDispatcher();

	const handlelSubmitClick = async (resolutionScore: number) => {
		dispatch('updateScoringCondition', {
			resolutionScore: resolutionScore
		});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	class="p-0 rounded-lg shadow-xl bg-surface-50 dark:bg-surface-900 backdrop:bg-black/50 dark:backdrop:bg-white/50"
	bind:this={dialog}
	on:close={() => showScoringConditionModal.set(false)}
	on:click|self={() => dialog.close()}
>
	<div class="flex items-center justify-between variant-soft-secondary py-2 px-4">
		<span class="text-xl">Update Scoring Condition</span>
		<button class="btn p-2 variant-soft-secondary" on:click={() => dialog.close()}>
			<Icon icon="material-symbols:close-rounded" class="text-lg" />
		</button>
	</div>

	<form class="flex flex-col gap-2 p-4 -mt-2">
		<label>
			<span class="dark:text-white">Resolution Score</span>
			<input
				class="input dark:text-white"
				name="resolutionScore"
				type="number"
				min="1"
				bind:value={resolutionScore}
				placeholder="Enter resolution score here..."
			/>
		</label>

		<div class="flex justify-end gap-2">
			<button class="btn variant-soft-secondary" on:click={() => dialog.close()}>Close</button>

			<button
				class="btn variant-filled-secondary"
				on:click={async () => {
					await handlelSubmitClick(resolutionScore);
					await dialog.close();
				}}
			>
				Submit
			</button>
		</div>
	</form>
</dialog>

<style>
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
