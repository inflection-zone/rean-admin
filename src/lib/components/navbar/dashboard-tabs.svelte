<script lang="ts">
	import { dashboardMenu, type TabDefinition } from '$lib/components/navbar/navigation.tabs';
	import { page } from '$app/stores';

	export let userId = undefined;
	const dashboardTabs: TabDefinition[] = dashboardMenu(userId);

	let homeLink = `/users/${userId}/home`;
	let usersLink = `/users/${userId}/home/users-stats`;
	// let rhgLink;
	// let botLink;
</script>

<div class="flex gap-4">
	<a
		class="btn
		{$page.url.pathname === homeLink ? 'variant-filled-secondary' : 'variant-soft-secondary'} "
		href={homeLink}
	>
		Overall
	</a>

	<a
		class="btn
		{$page.url.pathname === usersLink ? 'variant-filled-secondary' : 'variant-soft-secondary'} "
		href={usersLink}
	>
		Distribution
	</a>
</div>
