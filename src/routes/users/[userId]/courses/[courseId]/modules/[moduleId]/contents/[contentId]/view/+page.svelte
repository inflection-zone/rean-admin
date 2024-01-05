<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let content = data.content;
	let title = content.Title;
	let description = (content.Description !== '' && content.Description !== null) ? content.Description : 'Not specified';
	let sequence = content.Sequence;
	let contentType = content.ContentType;
	let resourceLink = (content.ResourceLink !== '' && content.ResourceLink !== null) ? content.ResourceLink : 'Not specified';
	let imageUrl = content.ImageUrl;
	let durationInMins = (content.DurationInMins !== '' && content.DurationInMins !== null) ? content.DurationInMins : 'Not specified';
	
	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const moduleId = $page.params.moduleId;
	const contentId = $page.params.contentId;
	const courseRoute = `/users/${userId}/courses`;
	const editRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/edit`;
	const viewRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/view`;
	const contentRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/view`;
	const moduleRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;

	const breadCrumbs = [
		{
			name: 'Courses',
			path: courseRoute
		},
		{
			name: 'Modules',
			path: moduleRoute
		},
		{
			name: 'Content',
			path: contentRoute
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
				<th>View Content</th>
				<th class="text-end">
					<a href={moduleRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Title</td>
				<td>{title}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Sequence</td>
				<td>{sequence}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Duration In Minutes</td>
				<td>{durationInMins}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Content Type</td>
				<td>{contentType}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Resource Link</td>
				<td>
						{resourceLink}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					{#if imageUrl === 'undefined' || imageUrl == null}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
