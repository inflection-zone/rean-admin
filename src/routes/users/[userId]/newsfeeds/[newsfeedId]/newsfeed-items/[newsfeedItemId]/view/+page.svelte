<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import Icon from '@iconify/svelte';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';

	///////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let newsfeedItem =data.newsfeedItem;
	let id = newsfeedItem.id;
	let title = newsfeedItem.Title;
	let description = (newsfeedItem.Description !== null && newsfeedItem.Description !== "") ? newsfeedItem.Description : 'Not specified' ;
	let link = newsfeedItem.Link;
	let content = newsfeedItem.Content;
	let authorName = (newsfeedItem.AuthorName !== null &&  newsfeedItem.AuthorName !== "") ? newsfeedItem.AuthorName : 'Not specified';
	let authorEmail = (newsfeedItem.AuthorEmail !== null &&  newsfeedItem.AuthorEmail !== "") ? newsfeedItem.AuthorEmail : 'Not specified';;
	let authorLink = (newsfeedItem.AuthorLink !== null &&  newsfeedItem.AuthorLink !== "") ? newsfeedItem.AuthorLink : 'Not specified';;
	let publishingDate = new Date(newsfeedItem.PublishingDate);
	let image = newsfeedItem.Image;

	const userId = $page.params.userId;
	const newsfeedId = $page.params.newsfeedId;
	const editRoute = `/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items/${id}/edit`;
	const viewRoute = `/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items/${id}/view`;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;
	const newsfeedItemRoute = `/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items`;

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
			name: 'View',
			path: viewRoute
		}
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
				<th>View Newsfeed Item</th>
				<th class="text-end">
					<a href={newsfeedRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Title</td>
				<td>{title}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Link</td>
				<td>{link}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Content</td>
				<td>{content}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Author Name</td>
				<td>{authorName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Author Email</td>
				<td>{authorEmail}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Author Link</td>
				<td>{authorLink}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Published Date</td>
				<td>{date.format(publishingDate, 'DD MMM YYYY')}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					{#if image === 'undefined'}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={image} w="24" h="24" />
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
