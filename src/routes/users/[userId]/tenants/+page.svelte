<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let tenants = data.tenants.Items;

	const userId = $page.params.userId;
	const tenantRoute = `/users/${userId}/tenants`;
	const editRoute = (id) => `/users/${userId}/tenants/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/tenants/${id}/view`;
	const createRoute = `/users/${userId}/tenants/create`;

	const breadCrumbs = [{ name: 'Tenants', path: tenantRoute }];

	let name = undefined;
	let code = undefined;
	let email = undefined;
	let phone = undefined;
	let sortBy = 'Name';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	let totalTenantsCount = data.tenants.TotalCount;
	let isSortingName = false;
	let isSortingCode = false;
	let isSortingEmail = false;
	let isSortingPhone = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalTenantsCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	async function searchTenant(model) {
		let url = `/api/server/tenants/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (name) url += `&name=${name}`;
		if (code) url += `&code=${code}`;
		if (email) url += `&email=${email}`;
		if (phone) url += `&phone=${phone}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		tenants = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$: retrivedTenants = tenants.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: if (browser)
		searchTenant({
			name: name,
			code: code,
			email: email,
			phone: phone,
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
		isSortingCode = false;
		isSortingEmail = false;
		isSortingPhone = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Name') {
			isSortingName = true;
		} else if (columnName === 'Code') {
			isSortingCode = true;
		} else if (columnName === 'Email') {
			isSortingEmail = true;
		} else if (columnName === 'Phone') {
			isSortingPhone = true;
		}

		sortBy = columnName;
	}

	const handleTenantDelete = async (id) => {
		const tenantId = id;
		await Delete({
			sessionId: data.sessionId,
			tenantId
		});
		window.location.href = tenantRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/tenants`, {
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
		name="name"
		placeholder="Search by name"
		bind:value={name}
		class="input w-auto grow"
	/>
	<input
		type="text"
		name="code"
		placeholder="Search by code"
		bind:value={code}
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
					<button on:click={() => sortTable('Name')}>
						Name {isSortingName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>
					<button on:click={() => sortTable('Code')}>
						Code {isSortingCode ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th data-sort="Phone">Contact Number</th>
				<th>Email</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedTenants.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedTenants as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.Name, 20)} </a>
						</td>
						<td role="gridcell" aria-colindex={4} tabindex="0">{row.Code}</td>
						<td role="gridcell" aria-colindex={4} tabindex="0"
							>{row.Phone !== null ? row.Phone : 'Not specified'}</td
						>
						<td role="gridcell" aria-colindex={4} tabindex="0"
							>{row.Email !== null ? row.Email : 'Not specified'}</td
						>
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
							>
								<button
									on:click|preventDefault={() => confirmThis(handleTenantDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a tenant? </span>
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
