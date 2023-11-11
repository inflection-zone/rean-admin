<script lang="ts">
	import CollapsibleSection from '$lib/components/courses.view/collapsible.section.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	/////////////////////////////////////////////////////////////////////////////////////////////////

	export let userId = undefined;
	export let courses = [];
	$:courses
	courses = courses.map((item, index) => ({ ...item, index: index + 1 }));
	let addModuleRoute = (courseId) => `/users/${userId}/courses/${courseId}/modules/create`;
	let addContentRoute = (courseId, moduleId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/create`;
	let editCourseRoute = (courseId) => `/users/${userId}/courses/${courseId}/edit`;
	let editModuleRoute = (courseId, moduleId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/edit`;
	let editContentRoute = (courseId, moduleId, contentId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/edit`;
	let viewCourseRoute = (courseId) => `/users/${userId}/courses/${courseId}/view`;
	let viewModuleRoute = (courseId, moduleId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;
	let viewContentRoute = (courseId, moduleId, contentId) =>
		`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/edit`;

	const dispatch = createEventDispatcher();

	const handleContentDelete = async (id) => dispatch('onContentDeleteClick', { contentId: id });

	const handlelCourseDelete = async (courseId, modules) =>
		dispatch('onCourseDeleteClick', { courseId: courseId, modules: modules });

	const handlelModuleDelete = async (moduleId, contents) =>
		dispatch('onModuleDeleteClick', { moduleId: moduleId, contents: contents });

</script>

<div
	class="flex flex-col my-2 rounded-lg border border-secondary-100 dark:!border-surface-700 overflow-hidden"
>
	<div class="p-4 font-bold variant-soft-secondary">Courses</div>
	<section class="bg-white dark:bg-inherit overflow-auto">
		{#if courses.length <= 0 }
				<div class="m-3">No records found</div>
		{:else}
			{#each courses as course}
				<CollapsibleSection
					headerText="{course.index}. {course.Name}"
					itemsCount="Modules ({course.Modules.length})"
					addRoute={addModuleRoute(course.id)}
					editRoute={editCourseRoute(course.id)}
					viewRoute={viewCourseRoute(course.id)}
					src="/course.png"
					on:onDeleteClick|once={async () => await handlelCourseDelete(course.id, course.Modules)}
				>
					{#if course.Modules.length > 0}
						{#each course.Modules.sort((a, b) => a.Sequence - b.Sequence) as module, i}
							<CollapsibleSection
								headerText="{module.Sequence}. {module.Name}"
								itemsCount="Contents ({module.CourseContents.length})"
								addRoute={addContentRoute(course.id, module.id)}
								editRoute={editModuleRoute(course.id, module.id)}
								viewRoute={viewModuleRoute(course.id, module.id)}
								src="/module.png"
								on:onDeleteClick|once={async () =>
									await handlelModuleDelete(module.id, module.CourseContents)}
							>
								{#if module.CourseContents.length <= 0}
									Contents are not available!
								{:else}
									<div class="table-container border !border-secondary-100 dark:!border-surface-700">
										<table class="table table-compact">
											<thead class="!variant-soft-secondary">
												<tr>
													<th>Id</th>
													<th>Title</th>
													<th>Content Type</th>
													<th>Duration In Mins</th>
													<th />
													<th />
												</tr>
											</thead>
											<tbody class="!bg-white dark:!bg-inherit">
												{#each module.CourseContents.sort((a, b) => a.Sequence - b.Sequence) as content, i}
													<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
														<td role="gridcell" aria-colindex={1} tabindex="0">
															{content.Sequence}
														</td>
														<td>
															<a href={viewContentRoute(course.id, module.id, content.id)}>
																{content.Title}
															</a>
														</td>
														<td>{content.ContentType}</td>
												<td>{(content.DurationInMins !== '' && content.DurationInMins !== null) ? content.DurationInMins : 'Not specified'}</td>
														<td>
															<a
																href={editContentRoute(course.id, module.id, content.id)}
																class="btn p-2 -my-1 hover:variant-soft-primary"
															>
																<Icon icon="material-symbols:edit-outline" class="lg" />
															</a>
														</td>
														<td>
															<Confirm
																confirmTitle="Delete"
																cancelTitle="Cancel"
																let:confirm={confirmThis}
																on:delete={() => handleContentDelete(content.id)}
															>
																<button
																	on:click|preventDefault={() =>
																		confirmThis(handleContentDelete, content.id)}
																	class="btn p-2 -my-1 hover:variant-soft-error"
																>
																	<Icon
																		icon="material-symbols:delete-outline-rounded"
																		class="text-lg"
																	/>
																</button>
																<span slot="title"> Delete </span>
																<span slot="description">
																	Are you sure you want to delete a content?
																</span>
															</Confirm>
														</td>
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								{/if}
							</CollapsibleSection>
						{/each}
					{:else}
						<span class="text-sm">Modules are not available</span>
					{/if}
				</CollapsibleSection>
			{/each}
		{/if}
	</section>
</div>

<!-- <div class="w-full variant-soft-secondary rounded-lg p-2">
	<Paginator
		bind:settings={paginationSettings}
		on:page={onPageChange}
		on:amount={onAmountChange}
		buttonClasses=" text-primary-500"
		regionControl = 'bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200'
		controlVariant = 'rounded-full text-primary-500 '
		controlSeparator = 'fill-primary-400'
		/>
</div> -->
