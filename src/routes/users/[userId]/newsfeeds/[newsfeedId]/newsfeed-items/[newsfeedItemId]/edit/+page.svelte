<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import { showMessage } from '$lib/utils/message.utils';
	import Icon from '@iconify/svelte';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';
    import { enhance } from '$app/forms';

	export let form;
	export let data: PageServerData;
	let initiaData = {};
	let id = data.newsfeedItem.id;
	let title = data.newsfeedItem.Title;
	let description = data.newsfeedItem.Description;
	let link = data.newsfeedItem.Link;
	let content = data.newsfeedItem.Content;
	let authorName = data.newsfeedItem.AuthorName;
	let authorEmail = data.newsfeedItem.AuthorEmail;
	let authorLink = data.newsfeedItem.AuthorLink;
	let publishingDate = new Date(data.newsfeedItem.PublishingDate);
	let image = data.newsfeedItem.Image;
	$: avatarSource = image;

	//Original data
	let _title = title;
	let _description = description;
	let _link = link;
	let _content = content;
	let _authorName = authorName;
	let _authorEmail = authorEmail;
	let _authorLink = authorLink;
	let _publishingDate = publishingDate;
	let _image = image;

	function handleReset() {
		title = _title;
		description = _description;
		link = _link;
		content = _content;
		authorName = _authorName;
		authorEmail = _authorEmail;
		authorLink = _authorLink;
		image = _image;
	}

	const userId = $page.params.userId;
	const newsfeedId = $page.params.newsfeedId;
	const editRoute = `/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items/${id}/edit`;
	const viewRoute = `/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items/${id}/view`;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;
	const newsfeedItemRoute = `/users/${userId}/newsfeeds/newsfeed-items`;

	const breadCrumbs = [
		{
			name: 'Newsfeeds',
			path: newsfeedRoute
		},
		{
			name: 'Newsfeed-Items',
			path: newsfeedItemRoute
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
	action="?/updateNewsfeedItemAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Newsfeed Item</th>
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
						class="textarea"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Link *</td>
				<td>
					<input
						type="url"
						name="link"
						required
						bind:value={link}
						placeholder="Enter copyright here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Content *</td>
				<td>
					<input
						type="text"
						bind:value={content}
						name="content"
						required
						placeholder="Enter content here..."
						class="input w-full {form?.errors?.content ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.content}
						<p class="text-error-500 text-xs">{form?.errors?.ticontenttle[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Author Name</td>
				<td>
					<input
						type="text"
						name="authorName"
						bind:value={authorName}
						placeholder="Enter author name here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Author Email</td>
				<td>
					<input
						type="text"
						name="authorEmail"
						bind:value={authorEmail}
						placeholder="Enter author email here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Author Link</td>
				<td>
					<input
						type="url"
						name="authorLink"
						bind:value={authorLink}
						placeholder="Enter author link here..."
						class="input w-full {form?.errors?.authorLink ? 'border-error-300 text-error-500' : ''}"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Published Date</td>
				<td>{date.format(publishingDate, 'DD MMM YYYY')}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					{#if image === 'undefined'}
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={image} w="24" h="24" />
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{/if}
					<input type="hidden" name="image" value={image} />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
