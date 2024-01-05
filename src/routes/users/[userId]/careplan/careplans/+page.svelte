<script lang="ts">
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import {
		Paginator, type PaginationSettings,
	} from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { browser } from '$app/environment';

	///////////////////////////////////////////////////////////////////

	export let data: PageServerData;

	const userId = $page.params.userId;
	const careplansRoute = `/users/${userId}/careplan/careplans`;
	const createRoute = `/users/${userId}/careplan/careplans/create`;
	const editRoute = (id) => `/users/${userId}/careplan/careplans/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/careplan/careplans/${id}/view`;

	let name = undefined;
	let categoryId = undefined;
	let sortBy = 'Name';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	let totalCareplansCount = data.careplans.TotalCount;
	let isSortingName = false;
	let isSortingCategoryId = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalCareplansCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	let carePlans = data.careplans.Items;
	let careplanCategories = data.careplanCategories;

	const breadCrumbs = [
		{
			name: 'Careplan',
			path: careplansRoute
		}
	];

	async function searchCareplan(model) {
		let url = `/api/server/careplan/careplans/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (name) url += `&name=${name}`;
		if (categoryId == 'Category') {
			url;
		} else {
			url += `&categoryId=${categoryId}`;
		}

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		carePlans = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$: retrivedCareplans = carePlans.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: if (browser)
		searchCareplan({ 
			name: name, 
			categoryId: categoryId, 
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
		isSortingName = false;
		isSortingCategoryId = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Name') {
			isSortingName = true;
		} else if (columnName === 'CategoryId') {
			isSortingCategoryId = true;
		}
		sortBy = columnName;
	}

	const handleCareplanDelete = async (id) => {
		const careplanId = id;
		await Delete({
			sessionId: data.sessionId,
			careplanId
		});
		window.location.href = careplansRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/careplan/careplans`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('response', response);
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" placeholder="Search by Name" bind:value={name} class="input w-auto grow" />
	<select class="select w-auto grow" bind:value={categoryId}>
		<option disabled selected>Category</option>
		{#each careplanCategories as category}
			<option value={category.id}>{category.Type}</option>
		{/each}
	</select>
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid">
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>
					<button on:click={() => sortTable('Name')}>
						Name {isSortingName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th data-sort="Code">Code</th>
				<th>
					<button on:click={() => sortTable('CategoryId')}>
						Category {isSortingCategoryId ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedCareplans.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedCareplans as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{row.Name}</a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">{row.Code}</td>
						<td role="gridcell" aria-colindex={4} tabindex="0">{row.Type}</td>
						<td>
							<a class="btn p-2 hover:variant-soft-secondary" href={editRoute(row.id)}>
								<Icon icon="material-symbols:edit-outline" class="text-lg" />
							</a>
						</td>
						<td>
							<Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleCareplanDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>

								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete care plan? </span>
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
