<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const courseContent = data.courseContent;

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const moduleId = $page.params.moduleId;
	const courseContentRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents`;
	const createRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/create`;

	const breadCrumbs = [{ name: 'Course-Contents', path: courseContentRoute }];

	// const dataTableStore = createDataTableStore(
	// 	// Pass your source data here:
	// 	courseContent,
	// 	{
	// 		// The current search term.
	// 		search: '',
	// 		// The current sort key.
	// 		sort: '',
	// 		// Paginator component settings.
	// 		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	// 	}
	// );
	// // This automatically handles search, sort, etc when the model updates.
	// dataTableStore.subscribe((model) => dataTableHandler(model));

	// dataTableStore.updateSource(courseContent);

	const handleCourseContentDelete = async (e, id) => {
		const courseContentId = id;
		await Delete({
			sessionId: data.sessionId,
			courseContentId
		});
		window.location.href = courseContentRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/course-contents`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" placeholder="Search by name" class="input w-auto grow" />
	<input type="text" placeholder="Search by duration" class="input w-auto grow" />
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="flex justify-center flex-col mt-4 mx-10 overflow-y-auto ">
	<table class="table">
		<thead class="sticky top-0">
			<tr>
				<th>Id</th>
				<th>Title</th>
				<th>Description</th>
				<th>Course</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<!-- {#each $dataTableStore.filtered as row, rowIndex}
						<tr>
							<td >{rowIndex + 1}</td>
							<td >{row.Title}</td>
              <td ">{row.Description}</td>
              <td ">{row.Course}</td>
              <td ">
                <a href="/users/${userId}/courses/${courseId}/modules/{row.id}/edit"
                  >
								<Icon icon="material-symbols:edit-outline" class="text-lg" />
								</a
                >
              </td>
              <td>
                <Confirm
                    confirmTitle="Delete"
                    cancelTitle="Cancel"
                    let:confirm={confirmThis}
                    on:delete={(e) => {
                      handleCourseContentDelete(e, row.id);
                    }}
                  >
                    <button on:click|preventDefault ={() => confirmThis(handleCourseContentDelete, row.id)} >
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>

                    <span slot="title"> Delete </span>
                    <span slot="description"> Are you sure you want to delete a drug? </span>
                  </Confirm>
              </td>
						</tr> 
					{/each}  -->
		</tbody>
	</table>

	<!-- <div class=" w-full bg-secondary-500 h-36 lg:h-16 md:h-16 sm:h-36 mb-10 pt-1 rounded-b-lg ">
	{#if $dataTableStore.pagination}
		<Paginator
			bind:settings={$dataTableStore.pagination}
			buttonClasses="btn-icon bg-surface-50 dark:bg-surface-900"
		/>
	{/if}
		</div> -->
</div>
<!-- </div> -->
