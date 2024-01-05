<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';
    import { enhance } from '$app/forms';

	export let form;
	export let data: PageServerData;
	let initiaData = {};
	let id = data.labRecordType.id;
	let typeName = data.labRecordType.TypeName;
	let displayName = data.labRecordType.DisplayName;
	let snowmedCode = data.labRecordType.SnowmedCode;
	let loincCode = data.labRecordType.LoincCode;
	let normalRangeMin = data.labRecordType.NormalRangeMin;
	let normalRangeMax = data.labRecordType.NormalRangeMax;
	let unit = data.labRecordType.Unit;

	//Original data
	let _typeName = typeName;
	let _displayName = displayName;
	let _snowmedCode = snowmedCode;
	let _loincCode = loincCode;
	let _normalRangeMin = normalRangeMin;
	let _normalRangeMax = normalRangeMax;
	let _unit = unit;

	function handleReset() {
		typeName = _typeName;
		displayName = _displayName;
		snowmedCode = _snowmedCode;
		loincCode = _loincCode;
		normalRangeMin = _normalRangeMin;
		normalRangeMax = _normalRangeMax;
		unit = _unit;
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/lab-record-types/${id}/edit`;
	const viewRoute = `/users/${userId}/lab-record-types/${id}/view`;
	const labRecordTypesRoute = `/users/${userId}/lab-record-types`;

	const breadCrumbs = [
		{
			name: 'Lab-Records',
			path: labRecordTypesRoute
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateLabRecordTypeAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Lab Record</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type Name *</td>
				<td>
					<input
						type="text"
						name="typeName"
						required
						bind:value={typeName}
						placeholder="Enter type name here..."
						class="input w-full {form?.errors?.typeName ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.typeName}
						<p class="text-error-500 text-xs">{form?.errors?.typeName[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Display Name</td>
				<td>
					<input
						type="text"
						name="displayName"
						bind:value={displayName}
						placeholder="Enter display name here..."
						class="input w-full {form?.errors?.displayName
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.displayName}
						<p class="text-error-500 text-xs">{form?.errors?.displayName[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>SNOMED CODE</td>
				<td>
					<input
						type="text"
						name="snowmedCode"
						bind:value={snowmedCode}
						placeholder="Enter snomed code here..."
						class="input w-full {form?.errors?.snowmedCode
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.snowmedCode}
						<p class="text-error-500 text-xs">{form?.errors?.snowmedCode[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>LOINC CODE</td>
				<td>
					<input
						type="text"
						name="loincCode"
						bind:value={loincCode}
						placeholder="Enter loinc code here..."
						class="input w-full {form?.errors?.loincCode ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.loincCode}
						<p class="text-error-500 text-xs">{form?.errors?.loincCode[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Minimum Normal Range</td>
				<td>
					<input
						type="number"
						name="normalRangeMin"
						bind:value={normalRangeMin}
						placeholder="Enter minimum normal range here..."
						class="input w-full {form?.errors?.normalRangeMin
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.normalRangeMin}
						<p class="text-error-500 text-xs">{form?.errors?.normalRangeMin[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Maximum Normal Range</td>
				<td>
					<input
						type="number"
						name="normalRangeMax"
						bind:value={normalRangeMax}
						placeholder="Enter maximum normal range here..."
						class="input w-full {form?.errors?.normalRangeMax
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.normalRangeMax}
						<p class="text-error-500 text-xs">{form?.errors?.normalRangeMax[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Unit</td>
				<td>
					<input
						type="text"
						name="unit"
						bind:value={unit}
						placeholder="Enter unit here..."
						class="input w-full {form?.errors?.unit ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.unit}
						<p class="text-error-500 text-xs">{form?.errors?.unit[0]}</p>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
