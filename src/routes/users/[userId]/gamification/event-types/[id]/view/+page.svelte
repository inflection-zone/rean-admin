<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let id = data.eventType.id;
	let name = data.eventType.Name;
	let description = (data.eventType.Description !== null && data.eventType.Description ) ? data.eventType.Description: 'Not specified';

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/gamification/event-types/${id}/edit`;
	const viewRoute = `/users/${userId}/gamification/event-types/${id}/view`;
	const eventTypesRoute = `/users/${userId}/gamification/event-types`;

	const breadCrumbs = [
		{
			name: 'Event-Types',
			path: eventTypesRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={editRoute} class="btn variant-filled-secondary ml-auto">
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Event Type</th>
				<th class="text-end">
					<a href={eventTypesRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name</td>
				<td>{name}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Description</td>
				<td>{description}</td>
			</tr>
		</tbody>
	</table>
</div>
