<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import { showMessage } from '$lib/utils/message.utils';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';
	import type { PageServerData } from './$types';

	let fileinput;

	let retrievedTags = '';
	let tagsPlaceholder = 'Enter a tags here...';

	export let form;
	export let data: PageServerData;
	let initiaData = {};
	let id = data.symptom.id;
	let symptom = data.symptom.Symptom;
	let description = data.symptom.Description;
	let tags = data.symptom.Tags;
	let language = data.symptom.Language;
	let imageUrl = data.symptom.ImageUrl ?? undefined;
	let imageResourceId = data.symptom.ImageResourceId ?? undefined;

	//Original data
	let _symptom = symptom;
	let _description = description;
	let _tags = tags;
	let _language = language;
	let _imageResourceId = imageResourceId;

	function handleReset() {
		symptom = _symptom;
		description = _description;
		tags = _tags;
		language = _language;
		imageResourceId = _imageResourceId;
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/symptoms/${id}/edit`;
	const viewRoute = `/users/${userId}/symptoms/${id}/view`;
	const symptomRoute = `/users/${userId}/symptoms`;

	const breadCrumbs = [
		{
			name: 'Symptoms',
			path: symptomRoute
		},
		{
			name: 'Edit',
			path: editRoute
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
			const imageUrl_ = response.Data.FileResources[0].Url;
			console.log('imageUrl', imageUrl);
			const imageResourceId_ = response.Data.FileResources[0].id;
			console.log('imageResourceId_', imageUrl);
			if (imageResourceId_) {
				imageResourceId = imageResourceId_;
			}
			console.log('======', imageResourceId_);
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
	action="?/updateSymptomAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Symptom</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Symptom *</td>
				<td>
					<input
						type="text"
						name="symptom"
						required
						bind:value={symptom}
						placeholder="Enter symptom here..."
						class="input w-full {form?.errors?.symptom ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.symptom}
						<p class="text-error-500 text-xs">{form?.errors?.symptom[0]}</p>
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
				<td class="align-top">Tags</td>
				<td>
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" bind:value={tags} />
					{#if form?.errors?.tags}
						<p class="text-error-500 text-xs">{form?.errors?.tags[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Language *</td>
				<td>
					<input
						type="text"
						name="language"
						required
						bind:value={language}
						placeholder="Enter language here..."
						class="input w-full {form?.errors?.language ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.language}
						<p class="text-error-500 text-xs">{form?.errors?.language[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image *</td>
				<td>
					{#if imageUrl === 'undefined'}
						<input
							name="fileinput"
							type="file"
							required
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
					<input type="hidden" name="imageResourceId" value={imageResourceId} />
					{#if form?.errors?.imageResourceId}
						<p class="text-error-500 text-xs">{form?.errors?.imageResourceId[0]}</p>
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
