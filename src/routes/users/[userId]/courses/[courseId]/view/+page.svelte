<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import Icon from '@iconify/svelte';
	import { TreeBranch, TreeLeaf, TreeView } from 'svelte-tree-view-component';
	import type { PageServerData } from './$types';

	////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let course = data.course;
	let name = course.Name;
	let description = (course.Description  !== '' && course.Description !== null) ? course.Description : 'Not specified';
	let durationInDays = (course.DurationInDays  !== '' && course.DurationInDays !== null) ? course.DurationInDays : 'Not specified';
	let imageUrl = course.ImageUrl;
	let modules = course.Modules;

	modules = modules.sort((a, b) => a.Sequence - b.Sequence);
	console.log(modules);

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const viewRoute = `/users/${userId}/courses/${courseId}/view`;
	const courseRoute = `/users/${userId}/courses`;

	const moduleViewRoute = (courseId, moduleId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;
	const contentViewRoute = (courseId, moduleId, contentId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/view`;

	const breadCrumbs = [
		{ name: 'Courses', path: courseRoute },
		{ name: 'View', path: viewRoute }
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a
		href={`/users/${userId}/courses/${courseId}/modules/create`}
		class="btn variant-filled-secondary ml-auto">Add Module</a
	>
	<a href={`/users/${userId}/courses/${courseId}/edit`} class="btn variant-filled-secondary">
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Course</th>
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
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Duration in Days</td>
				<td>{durationInDays}</td>
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
				<td class="align-top">Modules</td>
				<td>
					{#if modules.length <= 0}
						Modules are not available!
					{:else}
						<TreeView lineColor="#5832A1" iconBackgroundColor="#5832A1" branchHoverColor="#5832A1">
							{#each modules as module, i}
								<TreeBranch defaultClosed>
									<div slot="root" class="flex">
										<a href={moduleViewRoute(courseId, module.id)}>
											<div class="flex">
												<img class="w-6" alt="logo" src="/module.png" />
												{module.Sequence}-{module.Name}
											</div>
										</a>
									</div>
									{#each module.Contents.sort((a, b) => a.Sequence - b.Sequence) as content, i}
										<TreeLeaf>
											<div class="flex">
												<a href={contentViewRoute(courseId, module.id, content.id)}>
													<div class="flex">
														<img class="w-6" alt="logo" src="/content.png" />
														{content.Sequence}-{content.Title}
													</div>
												</a>
											</div>
										</TreeLeaf>
									{/each}
								</TreeBranch>
							{/each}
						</TreeView>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
