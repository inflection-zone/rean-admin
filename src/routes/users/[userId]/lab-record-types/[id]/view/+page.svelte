<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	///////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let labRecordType = data.labRecordType;
	let id = labRecordType.id;
	let typeName = labRecordType.TypeName;
	let displayName = labRecordType.DisplayName !== null && labRecordType.DisplayName !== "" ? labRecordType.DisplayName : 'Not specified';
	let snowmedCode = labRecordType.SnowmedCode !== null ? labRecordType.SnowmedCode : 'Not specified';
	let loincCode = labRecordType.LoincCode !== null ? labRecordType.LoincCode : 'Not specified';
	let normalRangeMin = labRecordType.NormalRangeMin !== null ? labRecordType.NormalRangeMin : 'Not specified';
	let normalRangeMax = labRecordType.NormalRangeMax !== null ? labRecordType.NormalRangeMax : 'Not specified';
	let unit = labRecordType.Unit !== null ? labRecordType.Unit : 'Not specified';

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/lab-record-types/${id}/edit`;
	const viewRoute = `/users/${userId}/lab-record-types/${id}/view`;
	const labRecordTypesRoute = `/users/${userId}/lab-record-types`;

	const breadCrumbs = [
		{
			name: 'Lab-Records',
			path: labRecordTypesRoute
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
				<th>View Lab Record</th>
				<th class="text-end">
					<a href={labRecordTypesRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type Name</td>
				<td>{typeName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Display Name</td>
				<td>{displayName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>SNOMED CODE</td>
				<td>{snowmedCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>LOINC CODE</td>
				<td>{loincCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Minimum Normal Range</td>
				<td>{normalRangeMin}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Maximum Normal Range</td>
				<td>{normalRangeMax}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Unit</td>
				<td>{unit}</td>
			</tr>
		</tbody>
	</table>
</div>
