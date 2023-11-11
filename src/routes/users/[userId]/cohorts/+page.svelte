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
	let cohorts = data.cohorts.Items;

	const userId = $page.params.userId;
	const tenantRoute = `/users/${userId}/cohorts`;
	const editRoute = (id) => `/users/${userId}/cohorts/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/cohorts/${id}/view`;
	const createRoute = `/users/${userId}/cohorts/create`;

	const breadCrumbs = [{ name: 'Cohorts', path: tenantRoute }];

	let name = undefined;
	let tenantId = undefined;
	let sortBy = 'Name';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	let totalCohortsCount = data.cohorts.TotalCount;
	let isSortingName = false;
	let isSortingTenantId = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalCohortsCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	async function searchCohorts(model) {
		let url = `/api/server/cohorts/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (name) url += `&name=${name}`;
		// if (tenantId == 'Tenant') {
		// 	url;
		// } else {
		// 	url += `&tenantId=${tenantId}`;
		// }

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		cohorts = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$: retrivedCohorts = cohorts.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: if (browser)
		searchCohorts({
			name: name,
			tenantId: tenantId,
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

	const handleCohortDelete = async (e, id) => {
		const cohortId = id;
		await Delete({
			sessionId: data.sessionId,
			cohortId
		});
		window.location.href = tenantRoute;
	};

	function sortTable(columnName) {
		isSortingName = false;
		isSortingTenantId = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Name') {
			isSortingName = true;
		} else if (columnName === 'TenantId') {
			isSortingTenantId = true;
		}
		sortBy = columnName;
	}

	async function Delete(model) {
		const response = await fetch(`/api/server/cohorts`, {
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
	<!-- <select class="select w-auto grow" bind:value={tenantId}>
		<option disabled selected>Tenant</option>
		{#each tenants as tenant}
			<option value={tenant.id}>{tenant.Name}</option>
		{/each}
	</select> -->
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid">
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<!-- <th data-sort="">Tenant</th> -->
				<th>
					<button on:click={() => sortTable('Name')}>
						Name {isSortingName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>Description</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedCohorts.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedCohorts as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<!-- <td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{row.TenantId} </a>
						</td> -->
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.Name, 20)} </a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0"
							>{row.Description !== null && row.Description !== ''
								? Helper.truncateText(row.Description, 40)
								: 'Not specified'}</td
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
								on:delete={(e) => {
									handleCohortDelete(e, row.id);
								}}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleCohortDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a cohort? </span>
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
