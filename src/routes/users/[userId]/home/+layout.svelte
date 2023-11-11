<script lang="ts">
	import { page } from '$app/stores';
	import DashboardTabs from '$lib/components/navbar/dashboard-tabs.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	const userId = $page.params.userId;
</script>

<DashboardTabs {userId} />
<slot />
