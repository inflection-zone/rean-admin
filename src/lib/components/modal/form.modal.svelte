<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';
	import { showGetApiKeyModal } from '../../store/general.store';
	export let userName = undefined;
	export let password = undefined;
	let dialog; // HTMLDialogElement

	$: if (dialog && $showGetApiKeyModal) dialog.showModal();

	console.log('$showGetApiKeyModal', $showGetApiKeyModal);

	const dispatch = createEventDispatcher();
	const handlelSubmitClick = async (userName: string, password: string) => {
		dispatch('submit', {
			userName: userName,
			password: password
		});
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
	class="p-0 rounded-lg shadow-xl bg-surface-50 dark:bg-surface-900 backdrop:bg-black/50 dark:backdrop:bg-white/50"
	bind:this={dialog}
	on:close={() => showGetApiKeyModal.set(false)}
	on:click|self={() => dialog.close()}
>
	<div class="flex items-center justify-between variant-soft-secondary py-2 px-4">
		<span class="text-xl">Provide Credentials</span>
		<button class="btn p-2 variant-soft-secondary" on:click={() => dialog.close()}>
			<Icon icon="material-symbols:close-rounded" class="text-lg" />
		</button>
	</div>

	<form class="flex flex-col gap-2 p-4 -mt-2">
		<label>
			<!-- donno why this didn't happen automatically -->
			<span class="dark:text-white">Client Code *</span>
			<input
				class="input"
				name="userName"
				type="text"
				bind:value={userName}
				placeholder="Enter user name here..."
			/>
		</label>

		<label>
			<span class="dark:text-white">Password *</span>
			<input
				class="input"
				type="password"
				name="password"
				bind:value={password}
				placeholder="Enter password here..."
			/>
		</label>

		<div class="flex justify-end gap-2">
			<button class="btn variant-soft-secondary" on:click={() => dialog.close()}>Close</button>

			<button
				type="button"
				class="btn variant-filled-secondary"
				on:click={async () => {
					await handlelSubmitClick(userName, password);
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
