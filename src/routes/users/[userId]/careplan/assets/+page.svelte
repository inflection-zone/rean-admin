<script lang="ts">
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { Paginator, type PaginationSettings } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import date from 'date-and-time';
	import { Helper } from '$lib/utils/helper';
	import { browser } from '$app/environment';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';

	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const userId = $page.params.userId;
	const assetType = data.assetTypes;
	let asset = data.assets.Items;
	let types = assetType.Data.AssetTypes;
	// let asset = data.assets;
	let selectedAssetType = 'Action plan';

	let assetName = undefined;
	let assetCode = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let offset = 0;
	let totalAssetsCount = data.assets.TotalCount;
	let isSortingAssetName = false;
	let isSortingAssetCode = false;
	let items = 10;

	let paginationSettings = {
		page: 0,
		limit: 10,
		size: totalAssetsCount,
		amounts: [10, 20, 30, 50]
	} satisfies PaginationSettings;

	const assetRouteMap = {
		'Action plan': 'action-plans',
		Animation: 'animations',
		Appointment: 'appointments',
		Article: 'articles',
		Assessment: 'assessments',
		Audio: 'audio',
		Biometrics: 'biometrics',
		Challenge: 'challenges',
		Checkup: 'checkups',
		Consultation: 'consultations',
		Exercise: 'exercises',
		Goal: 'goals',
		Infographics: 'infographics',
		Medication: 'medications',
		Meditation: 'meditations',
		Message: 'messages',
		Nutrition: 'nutritions',
		Physiotherapy: 'physiotherapy',
		Priority: 'priorities',
		Reflection: 'reflections',
		Reminder: 'reminders',
		Video: 'video',
		'Web link': 'web-links',
		'Web newsfeed': 'web-newsfeeds',
		'Word power': 'word-power'
	};
	async function searchAssets(model) {
		const selectedAssetRoute = assetRouteMap[selectedAssetType];
		let url = `/api/server/careplan/assets/search?assetType=${selectedAssetRoute}`;
		console.log('url', url);
		if (sortOrder) url += `&sortOrder=${sortOrder}`;
		else url += `&sortOrder=ascending`;
		if (sortBy) url += `&sortBy=${sortBy}`;
		if (itemsPerPage) url += `&itemsPerPage=${itemsPerPage}`;
		if (offset) url += `&pageIndex=${offset}`;
		if (assetName) url += `&assetName=${assetName}`;
		if (assetCode) url += `&assetCode=${assetCode}`;
		console.log('url', url);
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		console.log('response', response);
		asset = response.map((item, index) => ({ ...item, index: index + 1 }));
	}

	$: retrivedAssets = asset.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);

	$: if (browser)
		searchAssets({
			selectedAssetType: selectedAssetType,
			assetName: assetName,
			assetCode: assetCode,
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
		isSortingAssetName = false;
		isSortingAssetCode = false;
		sortOrder = sortOrder === 'ascending' ? 'descending' : 'ascending';
		if (columnName === 'Name') {
			isSortingAssetName = true;
		} else if (columnName === 'AssetCode') {
			isSortingAssetCode = true;
		}
		sortBy = columnName;
	}

	const onSelectAssetType = async (e) => {
		selectedAssetType = e.currentTarget.value;
		await searchAssets({
			sessionId: data.sessionId,
			selectedAssetType
		});
	};

	const assetRoute = () => `/users/${userId}/careplan/assets`;
	const breadCrumbs = [
		{
			name: 'Assets',
			path: assetRoute()
		}
	];

	const handleAssetsDelete = async (e, id) => {
		const selectedAssetRoute = assetRouteMap[selectedAssetType];
		const assetId = id;
		console.log(assetId, 'assetId');
		await Delete({
			sessionId: data.sessionId,
			selectAsset: selectedAssetRoute,
			assetId: assetId
		});
		window.location.href = assetRoute();
	};

	async function Delete(model) {
		console.log('Model', model);
		const response = await fetch(`/api/server/careplan/assets`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('response', response);
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2 mt-1">
	<select id="height" class="select" on:change={onSelectAssetType}>
		{#each types as val}
			<option value={val}>
				{val}
			</option>
		{/each}
	</select>
	<input
		type="text"
		name="name"
		placeholder="Search by name"
		bind:value={assetName}
		class="input w-auto grow"
	/>
	<input
		type="text"
		name="code"
		placeholder="Search by code"
		bind:value={assetCode}
		class="input w-auto grow"
	/>

	<a
		href="/users/{userId}/careplan/assets/{assetRouteMap[selectedAssetType]}/create/"
		class="btn variant-filled-secondary">Add New</a
	>
</div>

<div class="table-container my-2 !border !border-secondary-100 dark:!border-surface-700">
	<table class="table" role="grid">
		<thead class="!variant-soft-secondary">
			<tr>
				<th data-sort="index">Id</th>
				<th>
					<button on:click={() => sortTable('Name')}>
						Name {isSortingAssetName ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>
					<button on:click={() => sortTable('AssetCode')}>
						Code {isSortingAssetCode ? (sortOrder === 'ascending' ? '▲' : '▼') : ''}
					</button>
				</th>
				<th>Type</th>
				<th>Created Date</th>
				<th />
				<th />
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			{#if retrivedAssets.length <= 0 }
				<tr>
					<td colspan="6">No records found</td>
				</tr>
			{:else}
				{#each retrivedAssets as row}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td role="gridcell" aria-colindex={1} tabindex="0">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0">
							<a href="{assetRoute()}/{assetRouteMap[selectedAssetType]}/{row.id}/view"
								>{Helper.truncateText(row.Name, 20)}</a
							>
						</td>
						<td role="gridcell" aria-colindex={3} tabindex="0">{row.AssetCode}</td>
						<td role="gridcell" aria-colindex={4} tabindex="0">{row.AssetCategory}</td>
						<td role="gridcell" aria-colindex={5} tabindex="0"
							>{date.format(new Date(row.CreatedAt), 'DD-MMM-YYYY')}</td
						>
						<td>
							<a
								class="btn p-2 hover:variant-soft-secondary"
								href="{assetRoute()}/{assetRouteMap[selectedAssetType]}/{row.id}/edit"
							>
								<Icon icon="material-symbols:edit-outline" class="text-lg" />
							</a>
						</td>
						<td>
							<Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
								on:delete={(e) => {
									handleAssetsDelete(e, row.id);
								}}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleAssetsDelete, row.id)}
									class="btn p-2 -my-1 hover:variant-soft-error"
								>
									<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
								</button>

								<span slot="title">Delete</span>
								<span slot="description"> Are you sure you want to delete an asset? </span>
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
		regionControl="bg-surface-100 rounded-lg btn-group text-primary-500 border border-primary-200"
		controlVariant="rounded-full text-primary-500 "
		controlSeparator="fill-primary-400"
	/>
</div>
