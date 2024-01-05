<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	console.log(data.cohort)
	let name = data.cohort.Name;
	let description = (data.cohort.Description !== '' && data.cohort.Description !== null) ? data.cohort.Description : 'Not specified';
	let tenant = data.cohort.TenantId;
	let imageUrl = data.cohort.ImageUrl;

	const userId = $page.params.userId;
	const cohortId = $page.params.id;
	const editRoute = `/users/${userId}/cohorts/${cohortId}/edit`;
	const viewRoute = `/users/${userId}/cohorts/${cohortId}/view`;
	const cohortRoute = `/users/${userId}/cohorts`;

	const breadCrumbs = [
		{
			name: 'cohorts',
			path: cohortRoute
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
				<th>View Cohort</th>
				<th class="text-end">
					<a href={cohortRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<!-- <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Tenant</td>
				<td>{tenant}</td>
			</tr> -->
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name</td>
				<td>{name}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					{#if imageUrl === 'undefined'}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
