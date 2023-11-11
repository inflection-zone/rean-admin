<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { show } from '$lib/utils/message.utils';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import type { PageServerData } from './$types';

	///////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let symptom = data.symptom.Symptom;
	let description = data.symptom.Description !== null ? data.symptom.Description : 'Not specified';
	let tags = data.symptom.Tags;
 
	let language = data.symptom.Language;
	let imageUrl = data.symptom.ImageUrl;

	if (tags.length < 1) {
		tags = tags.join(', ');
	}

	const userId = $page.params.userId;
	const symptomId = $page.params.id;
	const editRoute = `/users/${userId}/symptoms/${symptomId}/edit`;
	const viewRoute = `/users/${userId}/symptoms/${symptomId}/view`;
	const symptomRoute = `/users/${userId}/symptoms`;

	const breadCrumbs = [
		{
			name: 'Symptoms',
			path: symptomRoute
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
				<th>View Symptom</th>
				<th class="text-end">
					<a href={symptomRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Symptom</td>
				<td>{symptom}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Language</td>
				<td>{language}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Tags</td>
				<td>
					{#if tags.length <= 0}
						<span class="span">Tags not specified</span>
					{:else}
						<span class="span">{tags}</span>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					{#if imageUrl == 'undefined' || imageUrl == null}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
