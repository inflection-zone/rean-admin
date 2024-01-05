<script lang="ts">
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import InputChip from '$lib/components/input-chips.svelte';
	import Icon from '@iconify/svelte';
    import { enhance } from '$app/forms';

	///////////////////////////////////////////////////////////////////////////////

	const userId = $page.params.userId;
	const biometricsId = $page.params.id;
	const assetRoute = `/users/${userId}/careplan/assets`;
	const editRoute = `/users/${userId}/careplan/assets/biometrics/${biometricsId}/edit`;
	const viewRoute = `/users/${userId}/careplan/assets/biometrics/${biometricsId}/view`;
	const biometricRoute = `/users/${userId}/careplan/assets/biometrics/create`;

	export let form;
	export let data: PageServerData;
	let assetCode = data.biometrics.AssetCode;
	let name = data.biometrics.Name;
	let description = data.biometrics.Description;
	let biometricsType = data.biometrics.BiometricsType;
	let measurementUnit = data.biometrics.MeasurementUnit;
	let tags = data.biometrics.Tags;
	let version = data.biometrics.Version;

	//Original data
	let _name = name;
	let _description = description;
	let _biometricsType = biometricsType;
	let _measurementUnit = measurementUnit;
	let _tags = JSON.stringify(tags);
	let _version = version;

	function handleReset() {
		name = _name;
		description = _description;
		biometricsType = _biometricsType;
		measurementUnit = _measurementUnit;
		tags = JSON.parse(_tags);
		version = _version;
	}

	const breadCrumbs = [
		{
			name: 'Assets',
			path: assetRoute
		},
		{
			name: 'Biometric',
			path: biometricRoute
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
	action="?/updateBiometricsAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Biometrics</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Asset Code</td>
				<td>{assetCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name *</td>
				<td>
					<input
						type="text"
						required
						placeholder="Enter name here..."
						class="input {form?.errors?.name ? 'border-error-300 text-error-500' : ''}"
						name="name"
						bind:value={name}
					/>
					{#if form?.errors?.name}
						<p class="text-error-500 text-xs">{form?.errors?.name[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>
					<textarea
						class="textarea"
						name="description"
						placeholder="Enter description here..."
						bind:value={description}
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Biometrics Type</td>
				<td>
					<select
						name="biometricsType"
						bind:value={biometricsType}
						class="select select-primary w-full "
					>
						<option>Blood pressure</option>
						<option>Blood glucose</option>
						<option>Blood oxygen saturation</option>
						<option>Body height</option>
						<option>Body weight</option>
						<option>Body temperature</option>
						<option>Pulse</option>
						<option>Other</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Measurement Unit</td>
				<td>
					<input
						type="text"
						placeholder="Enter Measurementunit url here..."
						class="input input-bordered input-primary w-full "
						bind:value={measurementUnit}
						name="measurementUnit"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" bind:value={tags} />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Version</td>
				<td>
					<input
						type="text"
						name="version"
						class="input"
						placeholder="V 1.0"
						bind:value={version}
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
