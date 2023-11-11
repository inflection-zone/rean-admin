<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import { showMessage } from '$lib/utils/message.utils';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	/////////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let id = data.content.id;
	let title = data.content.Title;
	let description = data.content.Description;
	let contentType = data.content.ContentType;
	let resourceLink = data.content.ResourceLink;
	let sequence = data.content.Sequence;
	let durationInMins = data.content.DurationInMins;
	let imageUrl = data.content.ImageUrl;
	$: avatarSource = imageUrl;

	//Original data
	let _title = title;
	let _description = description;
	let _contentType = contentType;
	let _resourceLink = resourceLink;
	let _sequence = sequence;
	let _imageUrl = imageUrl;
	let _durationInMins = durationInMins;

	function handleReset() {
		title = _title;
		description = _description;
		contentType = _contentType;
		resourceLink = _resourceLink;
		sequence = _sequence;
		imageUrl = _imageUrl;
		durationInMins = _durationInMins;
	}

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const moduleId = $page.params.moduleId;
	const contentId = $page.params.contentId;
	const editRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/edit`;
	const viewRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${contentId}/view`;
	const courseRoute = `/users/${userId}/courses`;
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
			path: viewRoute
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
			const imageResourceId = response.Data.FileResources[0].id;
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
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateCourseContentAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Content</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Title *</td>
				<td>
					<input
						type="text"
						name="title"
						required
						bind:value={title}
						placeholder="Enter title here..."
						class="input w-full {form?.errors?.title ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.title}
						<p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
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
				<td>Duration In Minutes</td>
				<td>
					<input
						type="number"
						name="durationInMins"
						placeholder="Enter duration here..."
						bind:value={durationInMins}
						min="1"
						class="input w-full {form?.errors?.durationInMins
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.durationInMins}
						<p class="text-error-500 text-xs">{form?.errors?.durationInMins[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Content Type *</td>
				<td>
					<select
						class="select w-full"
						required
						bind:value={contentType}
						placeholder="Select content type here..."
						name="contentType"
					>
						<option>Text</option>
						<option>Pdf</option>
						<option>Video</option>
						<option>Assessment</option>
					</select>
					{#if form?.errors?.contentType}
						<p class="text-error-500 text-xs">{form?.errors?.contentType[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Resource Link</td>
				<td>
					<input
						type="url"
						name="resourceLink"
						bind:value={resourceLink}
						placeholder="Enter resource link here..."
						class="input w-full {form?.errors?.durationInMins
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.resourceLink}
						<p class="text-error-500 text-xs">{form?.errors?.resourceLink[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Sequence</td>
				<td>
					<input
						bind:value={sequence}
						type="number"
						name="sequence"
						placeholder="Enter sequence here..."
						min="1"
						class="input w-full {form?.errors?.sequence ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.sequence}
						<p class="text-error-500 text-xs">{form?.errors?.sequence[0]}</p>
					{/if}
				</td>
			</tr>

			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					{#if imageUrl === 'undefined' || imageUrl == null}
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
