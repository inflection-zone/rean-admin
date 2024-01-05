<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
	import SvgIcon from '$lib/components/svgIcon.svelte';
	
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let apiClients = data.apiClients.Items;

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/api-clients/create`;
	const editRoute = (id) => `/users/${userId}/api-clients/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/api-clients/${id}/view`;
	const apiClientRoute = `/users/${userId}/api-clients`;

	const breadCrumbs = [{ name: 'Clients', path: apiClientRoute }];

	let clientName = undefined;
	let contactEmail = undefined;
	let sortBy = 'ClientName';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	let totalClientsCount = data.apiClients.TotalCount;
	let isSortingName = false;
	let isSortingContactEmail = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalClientsCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	async function searchApiClient(model) {
		let url = `/api/server/api-client/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (clientName) url += `&clientName=${clientName}`;
		if (contactEmail) url += `&clientEmail=${contactEmail}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		apiClients = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$: retrivedClients = apiClients.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: if (browser)
		searchApiClient({
			clientName: clientName,
			contactEmail: contactEmail,
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
		isSortingContactEmail = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'ClientName') {
			isSortingName = true;
		} else if (columnName === 'ContactEmail') {
			isSortingContactEmail = true;
		}
		sortBy = columnName;
	}

	const handleApiClientDelete = async (id) => {
		const clientId = id;

		await Delete({
			sessionId: data.sessionId,
			apiClientId: clientId
		});
		window.location.href = apiClientRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/api-client`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}

	$:console.log("retrivedClients",retrivedClients)
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input
		type="text"
		name="clientName"
		placeholder="Search by Name"
		bind:value={clientName}
		class="input w-auto grow"
	/>
	<input
		type="text"
		name="email"
		placeholder="Search by Email"
		bind:value={contactEmail}
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
					<button on:click={() => sortTable('ClientName')}>
						Name {isSortingName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>
					<button on:click={() => sortTable('ContactEmail')}>
						Email {isSortingContactEmail ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>Phone</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedClients.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedClients as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.ClientName, 20)}</a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">{row.Email}</td>
						<td role="gridcell" aria-colindex={4} tabindex="0"
							>{row.Phone !== null && row.Phone !== '' ? row.Phone : 'Not specified'}</td
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
									on:click|preventDefault={() => confirmThis(handleApiClientDelete, row.id)}
									class="btn px-0 -my-2 hover:variant-soft-error"
								>
								<SvgIcon
									cls="stroke-slate-800 hover:stroke-error-500 stroke-2 fill-none"
									h="100%" w="100%" iconPath='/images/others/delete.svg#icon'/>
									<!-- <Icon icon="material-symbols:delete-outline-rounded" class="text-lg" /> -->
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a client? </span>
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
