<script lang="ts">
    import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { showMessage } from '$lib/utils/message.utils';
	import Icon from '@iconify/svelte';

	////////////////////////////////////////////////////////////////////////////////////////////

	export let form;
	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const moduleId = $page.params.moduleId;
	const createRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/create`;
	const courseRoute = `/users/${userId}/courses`;
	const moduleRoute = `/users/${userId}/courses/${courseId}/modules/${moduleId}/view`;

	let imageUrl = undefined;
	let fileinput;

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
			path: createRoute
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
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createCourseContentAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Content</th>
				<th class="text-end">
					<a href={moduleRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
					<textarea name="description" placeholder="Enter description here..." class="textarea" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Duration In Minutes</td>
				<td>
					<input
						type="number"
						name="durationInMins"
						placeholder="Enter duration here..."
						class="input"
						min="1"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Content Type *</td>
				<td>
					<select
						class="select w-full"
						required
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
						placeholder="Enter resource link here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Sequence *</td>
				<td>
					<input type="number" name="sequence" placeholder="Enter sequence here..." min="1" required class="input" />
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
