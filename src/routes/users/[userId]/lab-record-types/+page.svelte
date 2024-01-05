<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import {Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
    import { invalidate} from '$app/navigation';
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let labRecordTypes=data.labRecordTypes;
	let sortOrder = false;

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/lab-record-types/create`;
	const editRoute = (id) => `/users/${userId}/lab-record-types/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/lab-record-types/${id}/view`;
	const labRecordTypesRoute = `/users/${userId}/lab-record-types`;

	sort(sortOrder)
	$:{
		labRecordTypes = data.labRecordTypes;
		sort(sortOrder)
		labRecordTypes = labRecordTypes.map((item, index) => ({ ...item, index: index + 1 }));
	}
	function sort(sortOrder){
		labRecordTypes = labRecordTypes.sort((a, b) => {
			let fa = a.TypeName.toLowerCase(),
				fb = b.TypeName.toLowerCase();
			if (fa < fb) {
				return !sortOrder ? -1 : 1;
			}
			if (fa > fb) {
				return !sortOrder ? 1 : -1;
			}
			return 0;
		});
	}

	const breadCrumbs = [
		{
			name: 'Lab-Records',
			path: labRecordTypesRoute
		}
	];

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: labRecordTypes.length,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	$:paginationSettings.size = labRecordTypes.length;
	const handleLabRecordTypeDelete = async (id) => {
			const labRecordTypeId = id;
			await Delete({
			sessionId: data.sessionId,
			labRecordTypeId: labRecordTypeId
		});
		invalidate('app:labRecordType')
	};

	$: selectedLabRecordTypes = labRecordTypes.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	function onPageChange(e: CustomEvent): void {
		 paginationSettings.page = e.detail
	}

	function onAmountChange(e: CustomEvent): void {
		paginationSettings.limit = e.detail
	}

	async function Delete(model) {
		await fetch(`/api/server/lab-record-types?sessionId=${model.sessionId}&labRecordTypeId=${model.labRecordTypeId}`, {
			method:'DELETE',
			body:JSON.stringify(model),
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
				<th>
					<button on:click={() =>sort(sortOrder=!sortOrder?true:false) }>
						Type Name {sortOrder ? '▲' : '▼'}
					</button>
				</th>
				<!-- <th data-sort="TypeName">Type Name</th> -->
				<th data-sort="DisplayName">Display Name</th>
				<th>Minimum</th>
				<th>Maximum</th>
				<th>Unit</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if selectedLabRecordTypes.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each selectedLabRecordTypes as row, id}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href={viewRoute(row.id)}>{Helper.truncateText(row.TypeName, 20)} </a>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0"
							>{row.DisplayName !== null && row.DisplayName !== "" ? Helper.truncateText(row.DisplayName, 20) : 'Not specified'}
						</td>
						<td role="gridcell" aria-colindex={4} tabindex="0">{row.NormalRangeMin !== null ? row.NormalRangeMin : 'Not specified'}</td>
						<td role="gridcell" aria-colindex={5} tabindex="0">{row.NormalRangeMax !== null ? row.NormalRangeMax : 'Not specified'}</td>
						<td role="gridcell" aria-colindex={6} tabindex="0">{row.Unit !== null ? row.Unit : 'Not specified'}</td>
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
									on:click|preventDefault={() =>
									confirmThis(handleLabRecordTypeDelete, row.id)
									}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a lab record type? </span> 							</Confirm>
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
