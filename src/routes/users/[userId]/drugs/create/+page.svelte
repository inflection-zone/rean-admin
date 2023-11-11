<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';

	export let form;
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/drugs/create`;
	const drugsRoute = `/users/${userId}/drugs`;

	const breadCrumbs = [
		{ name: 'Drugs', path: drugsRoute },
		{ name: 'Create', path: createRoute }
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createDrugAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Drug</th>
				<th class="text-end">
					<a href={drugsRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
						placeholder="Enter ingredients here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Strength</td>
				<td>
					<select name="strength" class="select">
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
						placeholder="Enter other information here..."
						class="input"
					/>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
