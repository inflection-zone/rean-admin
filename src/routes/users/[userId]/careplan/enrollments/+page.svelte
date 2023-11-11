<script lang="ts">
	import date from 'date-and-time';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import {
		Paginator, type PaginationSettings,
	} from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let enrollment = data.enrollments.Items;

	const userId = $page.params.userId;
	const enrollmentsRoute = () => `/users/${userId}/careplan/enrollments`;

	const breadCrumbs = [
		{
			name: 'Enrollments',
			path: enrollmentsRoute()
		}
	];

	let carePlan = undefined;
	let displayId = undefined;
	let startDate = undefined;
	let endDate = undefined;
	let sortBy = 'StartDate';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	let totalEnrollmentsCount = data.enrollments.TotalCount;
	let isSortingCareplan = false;
	let isSortingDisplayId = false;
	let isSortingStartDate = false;
	let isSortingEndDate = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalEnrollmentsCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	async function searchEnrollments(model) {
		let url = `/api/server/careplan/enrollments/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (carePlan) {
			let careplanId = undefined
			let search = enrollment.find(item =>item.Careplan.Name === carePlan.trim())
			if (search){
				careplanId = search.Careplan.id;
			}
			console.log('data',data)
			// enrollment.forEach(element => {
			// 	if (element.Careplan.Name === carePlan.trim()){
			// 		careplanId = element.Careplan.id;
			// 	}			
			// });
			if(careplanId){
				url += `&carePlan=${careplanId}`;
			}
			else{
				url += `&carePlan=${carePlan}`;
			}
		}
		if (displayId) {
			url += `&displayId=${displayId}`;
		}
		if (startDate) {
			url += `&startDate=${startDate}`;
		}
		if (endDate) {
			url += `&endDate=${endDate}`;
		}
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		let response = await res.json();
		enrollment = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	// async function searchEnrollments(model) {
	// 	let url = `/api/server/careplan/enrollments/search?`;
	// 	if (sortOrder) url += `sortOrder=${sortOrder}`;
	// 	else url += `sortOrder=ascending`;
	// 	if (sortBy) url += `&sortBy=${sortBy}`;
	// 	if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
	// 	if (offset) url += `&pageIndex=${offset}`;
	// 	// if (carePlan) {
	// 	// 	const careplanId = enrollment.map((item) => {
	// 	// 		if (item.Careplan.Name == carePlan) {
	// 	// 			return item.Careplan.id;
	// 	// 		}
	// 	// 	});
	// 	// 	url += `&carePlan=${careplanId}`;
	// 	// }
	// 	if (carePlan) {
  //     let careplanId = undefined
	// 			enrollment.forEach(element => {
	// 					if (element.Careplan.Name === carePlan.trim()){
	// 							careplanId = element.Careplan.id;
	// 					}
	// 		});
	// 		if(careplanId){
	// 				url += `&carePlan=${careplanId}`;
	// 		}
	// 		else{
	// 				url += `&carePlan=${carePlan}`;
	// 		}
  //   }
	// 	if (displayId) {
	// 		url += `&displayId=${displayId}`;
	// 	}
	// 	if (startDate) {
	// 		url += `&startDate=${startDate}`;
	// 	}
	// 	if (endDate) {
	// 		url += `&endDate=${endDate}`;
	// 	}

	// 	const res = await fetch(url, {
	// 		method: 'GET',
	// 		headers: { 'content-type': 'application/json' }
	// 	});
	// 	const response = await res.json();
	// 	enrollment = response.map((item, index) => ({ ...item, index: index + 1 }));
	// }

	$: retrivedEnrollments = enrollment.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: if (browser)
		searchEnrollments({
			carePlan: carePlan,
			displayId: displayId,
			startDate: startDate,
			endDate: endDate,
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
		isSortingCareplan = false;
		isSortingDisplayId = false;
		isSortingStartDate = false;
		isSortingEndDate = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Careplan') {
			isSortingCareplan = true;
		} else if (columnName === 'DisplayId') {
			isSortingDisplayId = true;
		} else if (columnName === 'StartDate') {
			isSortingStartDate = true;
		} else if (columnName === 'EndDate') {
			isSortingEndDate = true;
		}
		sortBy = columnName;
	}

</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input bind:value={carePlan} type="text" placeholder="Search by care plan" class="input w-auto grow" />
	<input
		bind:value={displayId}
		type="text"
		placeholder="Search by Enrollment code"
		class="input w-auto grow"
	/>
	<input
		bind:value={startDate}
		type="date"
		required
		placeholder="Search by start date"
		class="input w-auto grow"
	/>
	<input
		bind:value={endDate}
		type="date"
		required
		placeholder="Search by end date"
		class="input w-auto grow"
	/>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid">
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>Participant</th>
				<th>Enrollment Code</th>
				<th>
					<button on:click={() => sortTable('Careplan')}>
						Careplan {isSortingCareplan ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>
					<button on:click={() => sortTable('StartDate')}>
						Start Date {isSortingStartDate ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>
					<button on:click={() => sortTable('EndDate')}>
						End Date {isSortingEndDate ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedEnrollments.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedEnrollments as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href="/users/${userId}/careplan/enrollments/{row.id}/view"
								>Participant - {row.Participant.DisplayId}</a
							>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">{row.DisplayId}</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">{row.Careplan.Name}</td>
						<td role="gridcell" aria-colindex={4} tabindex="0"
							>{date.format(new Date(row.StartDate), 'DD-MMM-YYYY')}</td
						>
						<td role="gridcell" aria-colindex={5} tabindex="0"
							>{date.format(new Date(row.EndDate), 'DD-MMM-YYYY')}</td
						>
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

