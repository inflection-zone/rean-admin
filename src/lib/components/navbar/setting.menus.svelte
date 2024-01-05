<script>
	import Icon from '@iconify/svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	const gotoLogout = async () => {
		dispatch('logout');
	};
</script>

<div class="flex justify-between">
	<button on:click={async () => await gotoLogout()} class="btn p-2 variant-soft-error">
		<Icon icon="material-symbols:logout-rounded" />
		<span class="text-xs">Sign Out</span>
	</button>

	<button class="btn variant-soft-error p-2" on:click>
		<Icon icon="material-symbols:close-rounded" class="text-xl" />
	</button>
</div>

<div class="flex items-center gap-2">
	<img
		class="object-cover rounded-full h-16 w-16"
		src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
		alt="avatar"
	/>
	<div>
		<h3 class="!text-lg font-medium">John Doe</h3>
		<p class="!text-sm">user@gmail.com</p>
		<p class="!text-sm">UserId:12345</p>
		<div class="flex gap-2 text-xs">
			<a href="/">My Accounts</a>
			<a href="/">My Portals</a>
		</div>
	</div>
</div>

<hr class="border-surface-200 dark:border-surface-700" />

<div class="flex items-center justify-between gap-2">
	<h3 class="!text-lg">Themes</h3>

	<LightSwitch rounded="rounded-full" height="h-6" width="w-12" />
</div>
