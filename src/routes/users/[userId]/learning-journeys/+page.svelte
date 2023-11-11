<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let learningPaths = data.learningPaths.Items;

	const userId = $page.params.userId;
	const learningJourneyRoute = `/users/${userId}/learning-journeys`;
	const editRoute = (id) => `/users/${userId}/learning-journeys/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/learning-journeys/${id}/view`;
	const createRoute = `/users/${userId}/learning-journeys/create`;

	const breadCrumbs = [{ name: 'Learning Journeys', path: learningJourneyRoute }];

	let name = undefined;
	let preferenceWeight = undefined;
	let sortBy = 'Name';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	let totalLearningJourneysCount = data.learningPaths.TotalCount;
	let isSortingName = false;
	let isSortingPreferenceWeight = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalLearningJourneysCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	async function searchLearningJourney(model) {
		let url = `/api/server/learning-journeys/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (name) url += `&name=${name}`;
		if (preferenceWeight) url += `&preferenceWeight=${preferenceWeight}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		learningPaths = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$: retrivedLearningJourneys = learningPaths.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: if (browser)
		searchLearningJourney({
			name: name,
			preferenceWeight: preferenceWeight,
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
		isSortingPreferenceWeight = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Name') {
			isSortingName = true;
		} else if (columnName === 'PreferenceWeight') {
			isSortingPreferenceWeight = true;
		}
		sortBy = columnName;
	}

	const handleLearningJourneyDelete = async (e, id) => {
		const symptomId = id;
		await Delete({
			sessionId: data.sessionId,
			symptomId
		});
		window.location.href = learningJourneyRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/learning-journeys`, {
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
		placeholder="Search by Name"
		bind:value={name}
		class="input w-auto grow"
	/>
	<input
		type="text"
		name="preferenceWeight"
		placeholder="Search by Preference Weight"
		bind:value={preferenceWeight}
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
				<th>Description</th>
				<th>
					<button on:click={() => sortTable('PreferenceWeight')}>
						Preference Weight {isSortingPreferenceWeight
							? sortOrder === 'ascending'
								? '▲'
								: '▼'
							: ''}
					</button>
				</th>
				<th>Created Date</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedLearningJourneys.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedLearningJourneys as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.Name, 20)}</a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">
							{row.Description !== null ? Helper.truncateText(row.Description, 30) : 'Not specified'}
						</td>
						<td role="gridcell" aria-colindex={4} tabindex="0"
							>{row.PreferenceWeight !== null ? row.PreferenceWeight : 'Not Specified'}</td
						>
						<td role="gridcell" aria-colindex={5} tabindex="0">
							{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}
						</td>
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
								on:delete={(e) => handleLearningJourneyDelete(e, row.id)}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleLearningJourneyDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a learning journey? </span>
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
