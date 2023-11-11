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
	let assessmentTemplates = data.assessmentTemplate.Items;
	const userId = $page.params.userId;
	const assessmentRoute = `/users/${userId}/assessment-templates`;
	const editRoute = (id) => `/users/${userId}/assessment-templates/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/assessment-templates/${id}/view`;
	const createRoute = `/users/${userId}/assessment-templates/create`;

	const breadCrumbs = [{ name: 'Assessments', path: assessmentRoute }];

	let title = undefined;
	let type = undefined;
	let sortBy = 'Title';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offest = 0;
	let totalAssessmentTemplatesCount = data.assessmentTemplate.TotalCount;
	let isSortingTitle = false;
	let isSortingType = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalAssessmentTemplatesCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	async function searchAssessmentTemplate(model) {
		let url = `/api/server/assessment-templates/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offest) url += `&pageIndex=${offest}`;
		if (title) url += `&title=${title}`;
		if (type) url += `&type=${type}`;

		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		assessmentTemplates = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$: retrivedAssessmentTemplates = assessmentTemplates.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$:console.log(retrivedAssessmentTemplates)
	$: if (browser)
		searchAssessmentTemplate({
			title,
			type,
			itemsPerPage: itemsPerPage,
			pageIndex: page,
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
		isSortingType = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Title') {
			isSortingTitle = true;
		} else if (columnName === 'Type') {
			isSortingType = true;
		}
		sortBy = columnName;
	}

	const handleAssessmentTemplateDelete = async (e, id) => {
		const assessmentTemplateId = id;
		await Delete({
			sessionId: data.sessionId,
			assessmentTemplateId: assessmentTemplateId
		});
		window.location.href = assessmentRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/assessment-templates`, {
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
		name="type"
		placeholder="Search by type"
		bind:value={type}
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
				<th>
					<button on:click={() => sortTable('Type')}>
						Type {isSortingType ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>Provider</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedAssessmentTemplates.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedAssessmentTemplates as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>
								{row.Title !== null && row.Title !== ''
								? Helper.truncateText(row.Title, 40)
								: 'Not specified'}
							</a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">
							{Helper.truncateText(row.Type, 40)}
						</td>
						<td role="gridcell" aria-colindex={4} tabindex="0">
							{row.Provider !== null && row.Provider !== ''
								? Helper.truncateText(row.Provider, 40)
								: 'Not specified'}
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
								on:delete={(e) => handleAssessmentTemplateDelete(e, row.id)}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleAssessmentTemplateDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title">Delete</span>
								<span slot="description">
									Are you sure you want to delete a assessment template?
								</span>
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
