<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import CoursesDragDrop from '$lib/components/drag-and-drop/courses-drag-drop.svelte';
	import SelectedCoursesDragDrop from '$lib/components/drag-and-drop/selected-courses-drag-drop.svelte';
	import { selectedItems } from '$lib/store/general.store';
	import { showMessage } from '$lib/utils/message.utils';
	import Icon from '@iconify/svelte';
	// import { createDataTableStore, dataTableHandler , localStorageStore} from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
    import { enhance } from '$app/forms';

	/////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let courses = data.courses;
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/learning-journeys/create`;
	const learningJourneyRoute = `/users/${userId}/learning-journeys`;

	let imageUrl = undefined;
	let fileinput;

	const breadCrumbs = [
		{
			name: 'Learning Journeys',
			path: learningJourneyRoute
		},
		{
			name: 'Create',
			path: createRoute
		}
	];

	const upload = async (imgBase64, filename) => {
		const data = {};
		console.log(imgBase64);
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];
		console.log(JSON.stringify(data));
		const res = await fetch(`/api/server/file-resources/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				filename: filename
			},
			body: JSON.stringify(data)
		});
		console.log(Date.now().toString());
		const response = await res.json();
		if (response.Status === 'success' && response.HttpCode === 201) {
			const imageResourceId = response.Data.FileResources[0].id;
			console.log('imageResourceId', imageResourceId);
			const imageUrl_ = response.Data.FileResources[0].Url;
			console.log('imageUrl_', imageUrl_);
			if (imageUrl_) {
				imageUrl = imageUrl_;
			}
			console.log(imageUrl);
		} else {
			showMessage(response.Message, 'error');
		}
	};

	const onFileSelected = async (e) => {
		let f = e.target.files[0];
		const filename = f.name;
		let reader = new FileReader();
		reader.readAsDataURL(f);
		reader.onload = async (e) => {
			fileinput = e.target.result;
			await upload(e.target.result, filename);
		};
	};

	let selectedCourses = [];
	$: selectedCourses;

	let courseIds = $selectedItems;
	$: courseIds;

	console.log('courseIds', courseIds);

	// const dataTableStore = createDataTableStore(courses, {
	// 	search: ''
	// });
	// dataTableStore.subscribe((model) => dataTableHandler(model));
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createLearningJourneyAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th class="whitespace-nowrap">Create Learning Journey</th>
				<th class="text-end">
					<a href={learningJourneyRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name *</td>
				<td>
					<input
						type="text"
						name="name"
						placeholder="Enter name here..."
						class="input w-full {form?.errors?.name ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.name}
						<p class="text-error-500 text-xs">{form?.errors?.name[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>
					<textarea name="description" placeholder="Enter description here..." class="textarea" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Preference Weight</td>
				<td>
					<input
						type="number"
						name="preferenceWeight"
						placeholder="Enter prefrence weight here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Duration In Days</td>
				<td>
					<input
						type="number"
						name="durationInDays"
						placeholder="Enter duration here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top w-1/4">Courses</td>
				<td class="flex flex-col gap-2 w-full">
					<!-- <input
						class="input"
						name="courses"
						bind:value={$dataTableStore.search}
						type="search"
						placeholder="Search course here..."
					/> -->

					<div class="flex flex-col gap-2">
						<!-- <CoursesDragDrop title = 'Available Courses' items={$dataTableStore.filtered} /> -->
						<CoursesDragDrop title = 'Available Courses' items={courses} />
						<SelectedCoursesDragDrop title = 'Drag & drop courses to learning journey' sletectItems={selectedCourses} />
					</div>

					<input
						name="courseIds"
						bind:value={$selectedItems}
						placeholder="Search course here..."
						hidden
					/>

					{#if form?.errors?.courseIds}
						<p class="text-error-500 text-xs">{form?.errors?.courseIds[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					<input
						name="fileinput"
						type="file"
						class="true input w-full"
						placeholder="Image"
						on:change={async (e) => await onFileSelected(e)}
					/>
					<input type="hidden" name="imageUrl" value={imageUrl} />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>

<!-- <style>
	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 1;
	}
</style> -->
