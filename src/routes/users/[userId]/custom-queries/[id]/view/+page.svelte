<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let name = data.query.Name;
	let description = data.query.Description !== null ? data.query.Description : 'Not specified';
	let query = data.query.Query;
  let tags = data.query.Tags.length > 0 ? data.query.Tags : "Not specified"; 

	const userId = $page.params.userId;
	const queryId = $page.params.id;
	const viewRoute = `/users/${userId}/custom-queries/${queryId}/view`;
	const editRoute = `/users/${userId}/custom-queries/${queryId}/edit`;
	const queryRoute = `/users/${userId}/custom-queries`;

	const breadCrumbs = [
		{
			name: 'Custom Queries',
			path: queryRoute
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
				<th>View Query</th>
				<th class="text-end">
					<a href={queryRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Query</td>
				<td>{query}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Tags</td>
				<td>{tags}</td>
			</tr>
		</tbody>
	</table>
</div>
