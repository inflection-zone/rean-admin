<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';
    import { enhance } from '$app/forms';

	export let form;
	export let data: PageServerData;
	let initiaData = {};
	let id = data.drug.id;
	let drugName = data.drug.DrugName;
	let genericName = data.drug.GenericName;
	let ingredients = data.drug.Ingredients;
	let strength = data.drug.Strength;
	let otherCommercialNames = data.drug.OtherCommercialNames;
	let manufacturer = data.drug.Manufacturer;
	let otherInformation = data.drug.OtherInformation;

	//Original data
	let _drugName = drugName;
	let _genericName = genericName;
	let _ingredients = ingredients;
	let _strength = strength;
	let _otherCommercialNames = otherCommercialNames;
	let _manufacturer = manufacturer;
	let _otherInformation = otherInformation;

	function handleReset() {
		drugName = _drugName;
		genericName = _genericName;
		ingredients = _ingredients;
		strength = _strength;
		otherCommercialNames = _otherCommercialNames;
		manufacturer = _manufacturer;
		otherInformation = _otherInformation;
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/drugs/${id}/edit`;
	const viewRoute = `/users/${userId}/drugs/${id}/view`;
	const drugsRoute = `/users/${userId}/drugs`;

	const breadCrumbs = [
		{ name: 'Drugs', path: drugsRoute },
		{ name: 'Edit', path: editRoute }
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateDrugAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Drug</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name *</td>
				<td>
					<input
						type="text"
						class="input {form?.errors?.drugName ? 'border-error-300 text-error-500' : ''}"
						name="drugName"
						placeholder="Enter name here..."
						bind:value={drugName}
						required
					/>
					{#if form?.errors?.drugName}
						<p class="text-error-500 text-xs">{form?.errors?.drugName[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Generic Name</td>
				<td>
					<input
						type="text"
						name="genericName"
						bind:value={genericName}
						placeholder="Enter generic name here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Ingredients</td>
				<td>
					<input
						type="text"
						name="ingredients"
						bind:value={ingredients}
						placeholder="Enter ingredients here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Strength</td>
				<td>
					<select name="strength" bind:value={strength} class="select">
						<option value="High">High</option>
						<option value="Auto">Auto</option>
						<option>Medium</option>
						<option>Low</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Commercial Name</td>
				<td>
					<input
						type="text"
						name="otherCommercialNames"
						bind:value={otherCommercialNames}
						placeholder="Enter commercial name here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Manufacture</td>
				<td>
					<input
						type="text"
						name="manufacturer"
						bind:value={manufacturer}
						placeholder="Enter manufacture here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Other Information</td>
				<td>
					<input
						type="text"
						name="otherInformation"
						bind:value={otherInformation}
						placeholder="Enter other information here..."
						class="input"
					/>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
