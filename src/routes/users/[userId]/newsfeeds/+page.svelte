<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let newsfeeds = data.newsfeeds.Items;

	const userId = $page.params.userId;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;
	const editRoute = (id) => `/users/${userId}/newsfeeds/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/newsfeeds/${id}/view`;
	const viewItemRoute = (id) => `/users/${userId}/newsfeeds/${id}/newsfeed-items/${id}/view`;
	const createRoute = `/users/${userId}/newsfeeds/create`;

	const breadCrumbs = [{ name: 'Newsfeeds', path: newsfeedRoute }];

	let title = undefined;
	let category = undefined;
	let sortBy = 'Title';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	let totalNewsfeedsCount = data.newsfeeds.TotalCount;
	let isSortingTitle = false;
	let isSortingCategory = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalNewsfeedsCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	async function searchNewsfeed(model) {
		let url = `/api/server/newsfeeds/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (title) url += `&title=${title}`;
		if (category) url += `&category=${category}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});

		const response = await res.json();
		newsfeeds = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$: retrivedNewsfeeds = newsfeeds.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: if (browser)
		searchNewsfeed({
			title: title,
			category: category,
			itemsPerPage: itemsPerPage,
			pageIndex: offset,
			sortOrder: sortOrder,
			sortBy: sortBy
		});

	function onPageChange(e: CustomEvent): void {
		let pageIndex = e.detail;
		itemsPerPage = items * (pageIndex + 1);
	}

	function onAmountChange(e: CustomEvent): void {
		itemsPerPage = e.detail;
		items = itemsPerPage;
	}

	function sortTable(columnName) {
		isSortingTitle = false;
		isSortingCategory = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Title') {
			isSortingTitle = true;
		} else if (columnName === 'Category') {
			isSortingCategory = true;
		}
		sortBy = columnName;
	}

	const handleNewsfeedDelete = async (e, id) => {
		const newsfeedId = id;
		await Delete({
			sessionId: data.sessionId,
			newsfeedId
		});
		window.location.href = newsfeedRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/newsfeeds`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input
		type="text"
		name="title"
		placeholder="Search by title"
		bind:value={title}
		class="input w-auto grow"
	/>
	<input
		type="text"
		name="category"
		placeholder="Search by category"
		bind:value={category}
		class="input w-auto grow"
	/>
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid">
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>
					<button on:click={() => sortTable('Title')}>
						Title {isSortingTitle ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>Link</th>
				<th>
					<button on:click={() => sortTable('Category')}>
						Category {isSortingCategory ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedNewsfeeds.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedNewsfeeds as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.Title, 20)}</a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0"
							>{Helper.truncateText(
								row.Link !== null && row.Link !== '' ? row.Link : 'Not specified',
								30
							)}</td
						>
						<td role="gridcell" aria-colindex={4} tabindex="0"
							>{row.Category !== null && row.Category !== '' ? row.Category : 'Not specified'}</td
						>
						<!-- <td role="gridcell" aria-colindex={5} tabindex="0"
							>{#if newsfeeds.length <= 0}
								<span>null</span>
							{:else}
								{#each row.FeedItems as items, i}
									<a href={viewItemRoute(items.id)}>
										{i + 1}.{Helper.truncateText(items.Title, 20)}</a
									>
									<br />
								{/each}
							{/if}
						</td> -->

						<td>
							<a href={editRoute(row.id)} class="btn p-2 -my-1 hover:variant-soft-primary">
								<Icon icon="material-symbols:edit-outline" class="text-lg" />
							</a>
						</td>
						<td>
							<Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
								on:delete={(e) => {
									handleNewsfeedDelete(e, row.id);
								}}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleNewsfeedDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a newsfeed? </span>
							</Confirm>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
	<Paginator
		bind:settings={paginationSettings}
		on:page={onPageChange}
		on:amount={onAmountChange}
		buttonClasses=" text-primary-500"
		regionControl = 'bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200'
		controlVariant = 'rounded-full text-primary-500 '
		controlSeparator = 'fill-primary-400'
		/>
</div>
