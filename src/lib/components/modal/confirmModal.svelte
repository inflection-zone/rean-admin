<script>
	import { createEventDispatcher } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	export let confirmTitle = 'Confirm';
	export let cancelTitle = 'Cancel';
	export let showDialog = false;

	const dispatch = createEventDispatcher();
	const handlelDeleteClick = async () => {
		dispatch('delete');
	};

	let functionToCall = { func: null, args: null };

	export async function callFunction() {
		await functionToCall['func'](...functionToCall['args']);
		showDialog = false;
	}

	export function confirm(func, ...args) {
		functionToCall = { func, args };
		showDialog = true;
	}
</script>

<slot {confirm} />

{#if showDialog}
	<div
		class="fixed inset-0 select-none z-[998] bg-black/50 dark:bg-white/50"
		in:fade={{ duration: 200 }}
		out:fade={{ delay: 200, duration: 200 }}
	/>
	<div
		class="absolute z-[999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 flex flex-col gap-4 rounded-lg shadow-xl bg-surface-50 dark:bg-surface-900"
		in:fly={{ y: -10, delay: 200, duration: 200 }}
		out:fly={{ y: -10, duration: 200 }}
	>
		<div>
			<span class="block !text-xl">
				<slot name="title">Are you sure you want to perform this action?</slot>
			</span>
			<span>
				<slot name="description">This action can't be undone!</slot>
			</span>
		</div>

		<div class="flex gap-2 justify-end">
			<button class="btn variant-soft-secondary" on:click={() => (showDialog = false)}>
				<slot name="cancel">
					{cancelTitle}
				</slot>
			</button>
			<button
				class="btn variant-filled-error"
				on:click|preventDefault={async () => {
					await handlelDeleteClick();
					await callFunction();
				}}
			>
				<slot name="confirm">
					{confirmTitle}
				</slot>
			</button>
		</div>
	</div>
{/if}

<!-- <style>
	.confirm-dialog {
		position: absolute;
		z-index: 999;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style> -->
