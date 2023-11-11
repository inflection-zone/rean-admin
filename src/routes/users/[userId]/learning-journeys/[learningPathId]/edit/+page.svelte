<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import CoursesDragDrop from '$lib/components/drag-and-drop/courses-drag-drop.svelte';
	import SelectedCoursesDragDrop from '$lib/components/drag-and-drop/selected-courses-drag-drop.svelte';
	import Image from '$lib/components/image.svelte';
	import { selectedItems } from '$lib/store/general.store';
	import { showMessage } from '$lib/utils/message.utils';
	import Icon from '@iconify/svelte';
	// import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let allCources = data.courses;
	// allCources = allCources.sort((a, b) => { return a.Sequence - b.Sequence; });
	let id = data.learningJourney.id;
	let name = data.learningJourney.Name;
	let preferenceWeight = data.learningJourney.PreferenceWeight;
	let description = data.learningJourney.Description;
	let durationInDays = data.learningJourney.DurationInDays;
	let courses = data.learningJourney.Courses;
	let imageUrl = data.learningJourney.ImageUrl;
	$: avatarSource = imageUrl;
	let courseIds: string[] = courses.map((item) => item.id);
	selectedItems.set(courseIds);
	$: courses;

	//Original data
	let _name = name;
	let _preferenceWeight = preferenceWeight;
	let _description = description;
	let _durationInDays = durationInDays;
	let _imageUrl = imageUrl;

	function handleReset() {
		name = _name;
		preferenceWeight = _preferenceWeight;
		description = _description;
		durationInDays = _durationInDays;
		imageUrl = _imageUrl;
	}

	const userId = $page.params.userId;
	const learningPathId = $page.params.learningPathId;
	const editRoute = `/users/${userId}/learning-journeys/${learningPathId}/edit`;
	const viewRoute = `/users/${userId}/learning-journeys/${learningPathId}/view`;
	const learningJourneyRoute = `/users/${userId}/learning-journeys`;

	const breadCrumbs = [
		{
			name: 'Learning Journeys',
			path: learningJourneyRoute
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];

	const upload = async (imgBase64, filename) => {
		const data = {};
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];
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
			avatarSource = e.target.result;
			await upload(e.target.result, filename);
		};
	};
	// const dataTableStore = createDataTableStore(allCources, {
	// 	search: ''
	// });
	// dataTableStore.subscribe((model) => dataTableHandler(model));
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateLearningJourneyAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Learning Journey</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
						bind:value={name}
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
					<textarea
						name="description"
						bind:value={description}
						placeholder="Enter description here..."
						class="textarea w-full  {form?.errors?.description
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.description}
						<p class="text-error-500 text-xs">{form?.errors?.description[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Preference Weight</td>
				<td>
					<input
						type="number"
						name="preferenceWeight"
						bind:value={preferenceWeight}
						placeholder="Enter prefrence weight here..."
						class="input w-full {form?.errors?.preferenceWeight
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.preferenceWeight}
						<p class="text-error-500 text-xs">{form?.errors?.preferenceWeight[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Duration In Days</td>
				<td>
					<input
						type="number"
						name="durationInDays"
						placeholder="Enter duration here..."
						bind:value={durationInDays}
						class="input w-full {form?.errors?.durationInDays
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.durationInDays}
						<p class="text-error-500 text-xs">{form?.errors?.durationInDays[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Courses</td>
				<td>
					<!-- <input
						class="input mb-3"
						bind:value={$dataTableStore.search}
						type="search"
						placeholder="Search course here..."
					/> -->
					<div class="mb-4 mt-1">
						<CoursesDragDrop title='Available courses' items={courses} />
					</div>
					<div>
						<SelectedCoursesDragDrop title='Add courses to learning journey' sletectItems={courses} />
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
					{#if imageUrl === 'undefined'}
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{/if}
					<input type="hidden" name="imageUrl" value={imageUrl} />
					{#if form?.errors?.imageUrl}
						<p class="text-error-500 text-xs">{form?.errors?.imageUrl[0]}</p>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
