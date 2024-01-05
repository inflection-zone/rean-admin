<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import {
		Paginator,
		type PaginationSettings
	} from '@skeletonlabs/skeleton';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let priorityTypes = data.priorityTypes;
	let index = Number;
	priorityTypes = priorityTypes.map((item, index) => ({ ...item, index: index + 1 }));

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/priorities/create`;
	const editRoute = (id) => `/users/${userId}/priorities/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/priorities/${id}/view`;
	const priorityRoute = `/users/${userId}/priorities`;

	const breadCrumbs = [{ name: 'Priorities', path: priorityRoute }];

	let type = undefined;
	let tags = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	async function searchPriority(model) {
		let url = `/api/server/priorities/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (pageIndex) url += `&pageIndex=${pageIndex}`;
		if (type) url += `&type=${type}`;
		if (tags) url += `&tags=${tags}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});

		const response = await res.json();
		priorityTypes = response.map((item, index) => ({ ...item, index: index + 1 }));
		// dataTableStore.updateSource(priorityTypes);
	}
	$: if (browser) searchPriority({ type: type, tags: tags });

	let paginationSettings = {
		page: 0,
		limit: priorityTypes.length,
		size: priorityTypes.length,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	const handlePriorityDelete = async (id) => {
		const priorityId = id;
		console.log('priorityId', priorityId);
		await Delete({
			sessionId: data.sessionId,
			priorityId: priorityId
		});
		window.location.href = priorityRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/priorities`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<a href={createRoute} class="btn variant-filled-secondary ml-auto">Add New</a>
</div>
<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid" >
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th data-sort="Type">Type</th>
				<th data-sort="Tags">Tags</th>
				<th>Created Date</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if priorityTypes.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each priorityTypes as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.Type, 20)} </a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">{row.Tags.length > 0 ? row.Tags : 'Not specified'}</td>
						<td role="gridcell" aria-colindex={4} tabindex="0"
							>{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td
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
									on:click|preventDefault={() => confirmThis(handlePriorityDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a priority? </span>
							</Confirm>
						</td>
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<div class="w-full variant-soft-secondary rounded-lg p-2">
	<div class="invisible">
		<Paginator
			bind:settings={paginationSettings}
			buttonClasses="btn-icon bg-surface-50 dark:bg-surface-900"
		/>
	</div>
</div>
