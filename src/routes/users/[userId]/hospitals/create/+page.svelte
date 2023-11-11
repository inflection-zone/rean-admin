<script lang="ts">
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';

	////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/hospitals/create`;
	const hospitalsRoute = `/users/${userId}/hospitals`;

	const breadCrumbs = [
		{ name: 'Hospitals', path: hospitalsRoute },
		{ name: 'Create', path: createRoute }
	];

	export let form;
	let healthSystems = data.healthSystems;
	// console.log('healthSystems ->', JSON.stringify(healthSystems, null, 2));
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createHospitalAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Add Hospital</th>
				<th class="text-end">
					<a href={hospitalsRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
						class="input {form?.errors?.hospitalName ? 'border-error-300 text-error-500' : ''}"
						name="hospitalName"
						placeholder="Enter name here..."
						required
					/>
					{#if form?.errors?.hospitalName}
						<p class="text-error-500 text-xs">{form?.errors?.hospitalName[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Health System</td>
				<td>
					<select name="healthSystemId" class="select select-primary w-full ">
						<option disabled selected>Select category of plan here...</option>
						{#each healthSystems as healthSystem}
							<option value={healthSystem.id}>{healthSystem.Name}</option>
						{/each}
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
