<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import Icon from '@iconify/svelte';
	import { TreeBranch, TreeLeaf, TreeView } from 'svelte-tree-view-component';
	import type { PageServerData } from './$types';

	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;

	let learningJourney = data.learningJourney;
	let courses = learningJourney.Courses;
	let learningPathId = $page.params.learningPathId;
	let name = learningJourney.Name;
	let preferenceWeight = learningJourney.PreferenceWeight !== null ? learningJourney.PreferenceWeight : 'Not specified';
	let description = learningJourney.Description !== null ? learningJourney.Description : 'Not specified';
	let durationInDays = learningJourney.DurationInDays ? learningJourney.DurationInDays : 'Not specified';
	let imageUrl = learningJourney.ImageUrl;

	courses = courses.sort((a, b) => {
		return a.Sequence - b.Sequence;
	});

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/learning-journeys/${learningPathId}/edit`;
	const viewRoute = `/users/${userId}/learning-journeys/${learningPathId}/view`;
	const courseRoute = `/users/${userId}/courses`;
	const learningJourneyRoute = `/users/${userId}/learning-journeys`;
	const courseViewRoute = (courseId) => `/users/${userId}/courses/${courseId}/view`;
	const moduleViewRoute = (courseId, moduleId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;
	const contentViewRoute = (courseId, moduleId, contentId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/view`;

	const breadCrumbs = [
		{ name: 'Learning Journeys', path: learningJourneyRoute },
		{ name: 'View', path: viewRoute }
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
				<th>View Learning Journey</th>
				<th class="text-end">
					<a href={learningJourneyRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
				<td>Prefrence Weight</td>
				<td>{preferenceWeight}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Duration In Days</td>
				<td>{durationInDays}</td>
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
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Courses</td>
				<td>
					{#if courses.length <= 0}
						<div>Courses are not available</div>
					{:else}
						<TreeView lineColor="#5832A1" iconBackgroundColor="#5832A1" branchHoverColor="#5832A1">
							{#each courses as course, i}
								<TreeBranch defaultClosed>
									<div slot="root" class="flex">
										<a href={courseViewRoute(course.id)}>
											<div class="flex">
												<img class="w-6 mr-2 " alt="logo" src="/course.png" />
												{i + 1}-{course.Name}
											</div>
										</a>
									</div>
									{#if course.Modules.length <= 0}
										<div />
									{:else}
										{#each course.Modules.sort((a, b) => a.Sequence - b.Sequence) as module, i}
											<TreeBranch defaultClosed>
												<div slot="root" class="flex flex-col">
													<a href={moduleViewRoute(course.id, module.id)}>
														<div class="flex">
															<img class="w-6 mr-2 mb-4" alt="logo" src="/module.png" />
															{module.Sequence}-{module.Name}
														</div>
													</a>
												</div>
												<!-- svelte-ignore empty-block -->
												{#if module.Contents.length <= 0}{:else}
													{#each module.Contents.sort((a, b) => a.Sequence - b.Sequence) as content, i}
														<TreeLeaf>
															<div class="flex">
																<a href={contentViewRoute(course.id, module.id, content.id)}>
																	<div class="flex">
																		<img class="w-6 mr-2 mb-4" alt="logo" src="/content.png" />
																		{content.Sequence}-{content.Title}
																	</div>
																</a>
															</div>
														</TreeLeaf>
													{/each}
												{/if}
											</TreeBranch>
										{/each}
									{/if}
								</TreeBranch>
							{/each}
						</TreeView>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
