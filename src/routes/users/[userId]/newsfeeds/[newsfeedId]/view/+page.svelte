<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import Icon from '@iconify/svelte';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	
	///////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let newsfeed = data.newsfeed;
	let id = newsfeed.id;
	let title = newsfeed.Title;
	let description = (newsfeed.Description !== null && newsfeed.Description !== "") ? newsfeed.Description : 'Not specified';
	let category = (newsfeed.Category !== null && newsfeed.Category !== "") ? newsfeed.Category : 'Not specified';
	let link = (newsfeed.Link !== null && newsfeed.Link !== "") ? newsfeed.Link : 'Not specified';
	let language = (newsfeed.Language !== null && newsfeed.Language !== "") ? newsfeed.Language : 'Not specified';
	let copyright = (newsfeed.Copyright !== null && newsfeed.Copyright !== "") ? newsfeed.Copyright : 'Not specified';
	let favicon = newsfeed.Favicon;
	let updated = new Date(newsfeed.Updated);
	let image = newsfeed.Image;
	let tags_ = newsfeed.Tags;
	let tags = tags_.join(', ');
	let newsfeedItems = newsfeed.FeedItems;

	console.log("newsfeed",newsfeed)
	const userId = $page.params.userId;
	const newsfeedId = $page.params.newsfeedId;
	const editRoute = `/users/${userId}/newsfeeds/${id}/edit`;
	const viewRoute = `/users/${userId}/newsfeeds/${id}/view`;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;
	const viewItemRoute = (id) => `/users/${userId}/newsfeeds/${id}/newsfeed-items/${id}/view`;
	const newsfeedItemRoute = `/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items/create`;
	const editItemRoute = (id) => `/users/${userId}/newsfeeds/${id}/newsfeed-items/${id}/edit`;

	const breadCrumbs = [
		{
			name: 'Newsfeeds',
			path: newsfeedRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];

	const handleNewsfeedItemDelete = async (e, id) => {
		const newsfeedItemId = id;
		await Delete({
			sessionId: data.sessionId,
			newsfeedItemId
		});
		window.location.href = viewRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/newsfeed-items`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={newsfeedItemRoute} class="btn variant-filled-secondary ml-auto">Add Items</a>
	<a href={editRoute} class="btn variant-filled-secondary">
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Newsfeed</th>
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
				<td>Category</td>
				<td>{category}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Link</td>
				<td>{link}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Language</td>
				<td>{language}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Copyright</td>
				<td>{copyright}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Favicon</td>
				<td>
					{#if !favicon}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={favicon} w="24" h="24" />
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Updated</td>
				<td>{date.format(updated, 'DD MMM YYYY')}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					{#if !image}
						Not specified
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={image} w="24" h="24" />
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Tags</td>
				<td>
					{#if tags.length <= 0}
						<span class="span">Tags not specified</span>
					{:else}
						<span class="span">{tags}</span>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Newsfeed Items</td>
				<!-- <td>
					{#if newsfeedItems.length <= 0}
						<span class="span">Newsfeed Items are not available!</span>
					{:else}
						<ol class="span w-1/2 md:w-2/3 lg:w-2/3 list-decimal" id="newsfeedItems">
							{#each newsfeedItems as newsfeedItem}
								<a href={viewItemRoute(newsfeedItem.id)}>
									<li>{newsfeedItem.Title}</li>
								</a>
							{/each}
						</ol>
					{/if}
				</td> -->
				<td>
					{#if newsfeedItems.length <= 0}
						<span class="span">Newsfeed items are not available!</span>
					{:else}
						<div
							class="table-container border border-secondary-100 dark:!border-surface-700"
							id="modules"
						>
							<table class="table table-compact">
								<thead class="!variant-soft-secondary">
									<tr>
										<th>Title</th>
										<th>Link</th>
										<th>Content</th>
										<th />
										<th />
									</tr>
								</thead>
								<tbody class="!bg-white dark:!bg-inherit">
									{#each newsfeedItems as newsfeedItem}
										<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
											<td>{Helper.truncateText(newsfeedItem.Title, 20)}</td>
											<td>{newsfeedItem.Link !== null ? newsfeedItem.Link : 'Not specified'}</td>
											<td>{Helper.truncateText(newsfeedItem.Content, 30)}</td>
											<td>
												<a
													href={editItemRoute(newsfeedItem.id)}
													class="btn p-2 -my-1 hover:variant-soft-primary"
												>
													<Icon icon="material-symbols:edit-outline" class="text-lg" />
												</a>
											</td>
											<td>
												<Confirm
													confirmTitle="Delete"
													cancelTitle="Cancel"
													let:confirm={confirmThis}
													on:delete={(e) => handleNewsfeedItemDelete(e, newsfeedItem.id)}
												>
													<button
														on:click|preventDefault={() =>
															confirmThis(handleNewsfeedItemDelete, newsfeedItem.id)}
														class="btn p-2 -my-1 hover:variant-soft-error"
													>
														<Icon
															icon="material-symbols:delete-outline-rounded"
															class="text-lg"
														/>
													</button>
													<span slot="title"> Delete </span>
													<span slot="description">
														Are you sure you want to delete a newsfeed item?
													</span>
												</Confirm>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
</div>
