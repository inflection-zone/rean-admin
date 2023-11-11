<script lang="ts">
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';

	////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const userId = $page.params.userId;
	const careplanId = $page.params.careplanId;
	const activityId = $page.params.activityId;
	const careplansRoute = `/users/${userId}/careplan/careplans`;
	const editRoute = `/users/${userId}/careplan/careplans/${careplanId}/scheduling/${activityId}/edit`;
	const viewRoute = `/users/${userId}/careplan/careplans/${careplanId}/scheduling/${activityId}/view`;
	const schedulingRoute = `/users/${userId}/careplan/careplans/${careplanId}/scheduling`;

	let id = data.careplanActivity.id;
	let assetType = data.careplanActivity.AssetType;
	let name = data.careplanActivity.Asset.Name;
	let timeslot = data.careplanActivity.TimeSlot;
	let day = data.careplanActivity.Day;

	const breadCrumbs = [
		{
			name: 'CarePlan',
			path: careplansRoute
		},
		{
			name: 'Scheduling',
			path: schedulingRoute
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

<div class="table-container my-2 border border-secondary-100 dark:!border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Careplan Activity</th>
				<th class="text-end">
					<a href={schedulingRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Asset Type</td>
				<td>{assetType}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Asset</td>
				<td>{name}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Schedule Day</td>
				<td>{day}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>TimeSlot</td>
				<td>{timeslot}</td>
			</tr>
		</tbody>
	</table>
</div>
