<script lang="ts">
	import date from 'date-and-time';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import {
		Paginator, type PaginationSettings,
	} from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import { browser } from '$app/environment';

	////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const userId = $page.params.userId;
	const enrollmentId = $page.params.enrollmentId;
	let enrollmentsTasks = data.enrollmentTask.Items;
	let participantResponse = data.participantResponse;
	let id = enrollmentsTasks.id;
	let enrollmentDsipId = data.enrollment;
	let enrollmentCode = enrollmentDsipId.DisplayId;

	console.log("enrollmentsTasks", enrollmentsTasks)
	const enrollmentsRoute = `/users/${userId}/careplan/enrollments`;
	const enrollmentsTask = `/users/${userId}/careplan/enrollments/${enrollmentId}/tasks`;

	let assetType = undefined;
	let scheduledDate = undefined;
	let sortBy = 'ScheduledDate';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	let totalEnrollmentTasksCount = data.enrollmentTask.TotalCount;
	let isSortingAssetType = false;
	let isSortingCreatedAt = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalEnrollmentTasksCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	enrollmentsTasks = enrollmentsTasks.map((item, index) => ({ ...item, index: index + 1 }));
	let enrollmentsTasksResult = enrollmentsTasks.map((task) => {
		const newTask = task;
		participantResponse.forEach((item) => {
			if (task.id === item.EnrollmentTaskId) {
				newTask.ProgressStatus = item.ProgressStatus;
			}
		});
		return newTask;
	});

	const breadCrumbs = [
		{
			name: 'Enrollment',
			path: enrollmentsRoute
		},
		{
			name: 'Task',
			path: enrollmentsTask
		}
	];

	async function searchEnrollments(model) {
		let url = `/api/server/careplan/enrollment-task/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (assetType) url += `&assetType=${assetType}`;
		if (scheduledDate) url += `&scheduledDate=${scheduledDate}`;

		console.log("url",url);
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		enrollmentsTasksResult = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$: retrivedEnrollmentTasks = enrollmentsTasksResult.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: if (browser)
		searchEnrollments({ 
			assetType: assetType, 
			scheduledDate: scheduledDate, 
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
		isSortingAssetType = false;
		isSortingCreatedAt = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'AssetType') {
			isSortingAssetType = true;
		} else if (columnName === 'ScheduledDate') {
			isSortingCreatedAt = true;
		}
		sortBy = columnName;
	}

</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex mx-2 gap-4">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="lable-text font-semibold">Enrollment Code</label>
	<span class="">{enrollmentCode}</span>
</div>
<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" placeholder="Search by Type" bind:value={assetType} class="input w-auto grow" />
	<!-- <input type="date" placeholder="Start date" bind:value={scheduledDate} class="input w-auto grow" /> -->
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid">
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>Name</th>
				<!-- <th>Type</th> -->
				<th>
					<button on:click={() => sortTable('AssetType')}>
						Type {isSortingAssetType ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<!-- <th>Created Date</th> -->
				<th>
					<button on:click={() => sortTable('CreatedAt')}>
						Created Date {isSortingCreatedAt ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>Completed</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedEnrollmentTasks.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedEnrollmentTasks as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">{row.Asset.Name}</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">{row.AssetType}</td>
						<td role="gridcell" aria-colindex={4} tabindex="0"
							>{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td
						>
						<td>
						{#if row.ProgressStatus === 'Completed'}
							<Icon icon="material-symbols:done-rounded" class="text-xl text-success-500"/>
						{:else}
							<Icon icon="material-symbols:close-rounded" class="text-xl text-error-500"/>
						{/if}</td>
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
