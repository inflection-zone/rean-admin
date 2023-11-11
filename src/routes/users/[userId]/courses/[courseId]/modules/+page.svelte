<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import Icon from '@iconify/svelte';
	import { Paginator, type PaginationSettings} from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
	import { browser } from '$app/environment';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let modules = data.modules.Items;

	const userId = $page.params.userId;
	const courseId = $page.params.courseId;
	const moduleRoute = `/users/${userId}/courses/${courseId}/modules`;
	const createRoute = `/users/${userId}/courses/${courseId}/modules/create`;

	const breadCrumbs = [{ name: 'Modules', path: moduleRoute }];

	// const dataTableStore = createDataTableStore(
	// 	// Pass your source data here:
	// 	module,
	// 	{
	// 		// The current search term.
	// 		search: '',
	// 		// The current sort key.
	// 		sort: '',
	// 		// Paginator component settings.
	// 		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	// 	}
	// );
	// // This automatically handles search, sort, etc when the model updates.
	// dataTableStore.subscribe((model) => dataTableHandler(model));

	// dataTableStore.updateSource(module);
	let name = undefined;
	let sortBy = 'Name';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	let totalModuleCount = data.modules.TotalCount;
	let isSortingName = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalModuleCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	async function searchCourseModule(model) {
		let url = `/api/server/modules/search?`;
		if (sortOrder) url += `sortOrder=${sortOrder}`;
		else url += `sortOrder=ascending`;

		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (name) url += `&name=${name}`;
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		modules = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$: retrivedCourseModule = modules.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: if (browser)
	searchCourseModule({
			name: name,
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

	const handleModuleDelete = async (e, id) => {
		const moduleId = id;
		await Delete({
			sessionId: data.sessionId,
			moduleId
		});
		window.location.href = moduleRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/modules`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<input type="text" placeholder="Search by name" class="input w-auto grow" />
	<input type="text" placeholder="Search by duration" class="input w-auto grow" />
	<a href={createRoute} class="btn variant-filled-secondary">Add New</a>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Id</th>
				<th>Name</th>
				<th>Description</th>
				<th>Duration</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#each retrivedCourseModule as row, rowIndex}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>{rowIndex + 1}</td>
					<td>{row.Name}</td>
					<td>{row.Description}</td>
					<td>{row.DurationInMins}</td>
					<td>
						<a
							href="/users/${userId}/courses/${courseId}/modules/{row.id}/edit"
							class="btn p-2 -my-1 hover:variant-soft-primary"
						>
							<Icon icon="material-symbols:edit-outline" class="text-lg" />
						</a>
					</td>
					<td>
						<Confirm
							confirmTitle="Delete"
							cancelTitle="Cancel"
							let:confirm={confirmThis}
							on:delete={(e) => handleModuleDelete(e, row.id)}
						>
							<button
								on:click|preventDefault={() => confirmThis(handleModuleDelete, row.id)}
								class="btn p-2 -my-1 hover:variant-soft-error"
							>
								<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
							</button>

							<span slot="title">Delete</span>
							<span slot="description">Are you sure you want to delete a module?</span>
						</Confirm>
					</td>
				</tr>
			{/each}
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
