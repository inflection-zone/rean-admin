<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { showMessage } from '$lib/utils/message.utils';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';

	/////////////////////////////////////////////////////////////////////////
	
	export let form;
	const userId = $page.params.userId;
	let image = undefined;
	let favicon = undefined;
	let fileInput;

	const createRoute = `/users/${userId}/newsfeeds/create`;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;

	const breadCrumbs = [
		{ name: 'Newsfeeds', path: newsfeedRoute },
		{ name: 'Create', path: createRoute }
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
			const image_ = response.Data.FileResources[0].Url;
			console.log('image_', image_);
			if (image_) {
				image = image_;
			}
			console.log(image);
		} else {
			showMessage(response.Message, 'error');
		}
	};

	const uploadFavicon = async (imgBase64, faviconName) => {
		const data = {};
		console.log(imgBase64);
		const imgData = imgBase64.split(',');
		data['favicon'] = imgData[1];
		console.log(JSON.stringify(data));
		const res = await fetch(`/api/server/favicon-resource/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				faviconName: faviconName
			},
			body: JSON.stringify(data)
		});
		console.log(Date.now().toString());
		const response = await res.json();
		if (response.Status === 'success' && response.HttpCode === 201) {
			const imageResourceId = response.Data.FileResources[0].id;
			console.log('imageResourceId', imageResourceId);
			const image_ = response.Data.FileResources[0].Url;
			console.log('image_', image_);
			if (image_) {
				favicon = image_;
			}
			console.log(favicon);
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
			fileInput = e.target.result;
			await upload(e.target.result, filename);
		};
	};

	const onFaviconSelected = async (e) => {
		let f = e.target.files[0];
		const faviconName = f.name;
		let reader = new FileReader();
		reader.readAsDataURL(f);
		reader.onload = async (e) => {
			fileInput = e.target.result;
			await uploadFavicon(e.target.result, faviconName);
		};
	};
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createNewsfeedAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Newsfeed</th>
				<th class="text-end">
					<a href={newsfeedRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
				<td>Category</td>
				<td>
					<input type="text" name="category" placeholder="Enter category here..." class="input" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Link</td>
				<td>
					<input type="url" name="link" placeholder="Enter copyright here..." class="input" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Language *</td>
				<td>
					<input
						type="text"
						name="language"
						required
						placeholder="Enter language here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Copyright</td>
				<td>
					<input
						type="text"
						name="copyright"
						placeholder="Enter copyright here..."
						class="input w-full {form?.errors?.copyright ? 'border-error-300 text-error-500' : ''}"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Favicon</td>
				<td>
					<input
						name="fileInput"
						type="file"
						class="true input w-full"
						placeholder="Image"
						on:change={async (e) => await onFaviconSelected(e)}
					/>
					<input type="hidden" name="favicon" value={favicon} />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Image</td>
				<td>
					<input
						name="fileInput"
						type="file"
						class="true input w-full"
						placeholder="Image"
						on:change={async (e) => await onFileSelected(e)}
					/>
					<input type="hidden" required name="image" value={image} />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
					<InputChip
						chips="variant-filled-error rounded-2xl"
						name="tags"
						palceholder="Enter tags here"
					/>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
