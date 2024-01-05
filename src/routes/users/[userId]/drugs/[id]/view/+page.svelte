<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	////////////////////////////////////////////////////////

	export let data: PageServerData;
	let drug = data.drug;
	let id = drug.id;
	let drugName = drug.DrugName;
	let genericName = drug.GenericName !== null ? drug.GenericName : 'Not specified';
	let ingredients = drug.Ingredients !== null ? drug.Ingredients : 'Not specified';
	let strength = drug.Strength !== null ? drug.Strength : 'Not specified';
	let commercialNames = drug.OtherCommercialNames !== null ? drug.OtherCommercialNames : 'Not specified';
	let manufacturer = drug.Manufacturer !== null ? drug.Manufacturer : 'Not specified';
	let otherInformation = drug.OtherInformation !== null ? drug.OtherInformation: 'Not specified';

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/drugs/${id}/edit`;
	const viewRoute = `/users/${userId}/drugs/${id}/view`;
	const drugRoute = `/users/${userId}/drugs`;

	const breadCrumbs = [
		{
			name: 'Drugs',
			path: drugRoute
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
				<th>View Drug</th>
				<th class="text-end">
					<a href={drugRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name</td>
				<td>{drugName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Generic Name</td>
				<td>{genericName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Ingredients</td>
				<td>{ingredients}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Strength</td>
				<td>{strength}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Commercial Name</td>
				<td>{commercialNames}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Manufacture</td>
				<td>{manufacturer}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Other Information</td>
				<td>{otherInformation}</td>
			</tr>
		</tbody>
	</table>
</div>
