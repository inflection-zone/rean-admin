<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let module = data.module;
	let name = module.Name;
	let description = (module.Description  !== '' && module.Description !== null) ? module.Description : 'Not specified';
	let durationInMins = (module.DurationInMins  !== '' && module.DurationInMins !== null) ? module.DurationInMins : 'Not specified';
	let imageUrl = module.ImageUrl;
	let contents = module.Contents;
	let sequence = module.Sequence;

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const moduleId = $page.params.moduleId;
	const editRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/edit`;
	const viewRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;
	const contentCreateRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/create`;
	const courseRoute = `/users/${userId}/courses/${courseId}/view`;
	const contentViewRoute = (courseId, moduleId, contentId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/view`;

	const breadCrumbs = [
		{
			name: 'Courses',
			path: courseRoute
		},
		{
			name: 'Modules',
			path: viewRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={contentCreateRoute} class="btn variant-filled-secondary ml-auto">Add Content</a>
	<a href={editRoute} class="btn variant-filled-secondary">
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Module</th>
				<th class="text-end">
					<a href={courseRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
				<td class="align-top">Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Duration In Minutes</td>
				<td>{durationInMins}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Sequence</td>
				<td>{sequence}</td>
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
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Contents</td>
				<td>
					{#if contents.length <= 0}
						Contents are not available!
					{:else}
						<ol class="span list-decimal" id="contents">
							{#each contents as content}
								<a href={contentViewRoute(courseId, moduleId, content.id)}>
									<li>{content.Title}</li>
								</a>
							{/each}
						</ol>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
