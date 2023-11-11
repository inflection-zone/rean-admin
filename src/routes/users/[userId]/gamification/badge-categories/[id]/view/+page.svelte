<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
  import Image from '$lib/components/image.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let id = data.badgeCategory.id;
	let name = data.badgeCategory.Name;
	let description = (data.badgeCategory.Description !== null && data.badgeCategory.Description ) ? data.badgeCategory.Description: 'Not specified';
  let imageUrl = data.badgeCategory.ImageUrl;

	const userId = $page.params.userId;
	const badgeCategoryId = $page.params.id;
	const editRoute = `/users/${userId}/gamification/badge-categories/${badgeCategoryId}/edit`;
	const viewRoute = `/users/${userId}/gamification/badge-categories/${badgeCategoryId}/view`;
	const badgeCategoryRoute = `/users/${userId}/gamification/badge-categories`;

	const breadCrumbs = [
		{
			name: 'Badge-Categories',
			path: badgeCategoryRoute
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
				<th>View Badge Category</th>
				<th class="text-end">
					<a href={badgeCategoryRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
