<script lang="ts">
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import InputChip from '$lib/components/input-chips.svelte';
	import Icon from '@iconify/svelte';

	////////////////////////////////////////////////////////////////////

	const userId = $page.params.userId;
	const careplanId = $page.params.careplanId;
	const editRoute = `/users/${userId}/careplan/careplans/${careplanId}/edit`;
	const viewRoute = `/users/${userId}/careplan/careplans/${careplanId}/view`;
	const careplansRoute = `/users/${userId}/careplan/careplans`;
	const schedulingRoute = `/users/${userId}/careplan/careplans/${careplanId}/scheduling`;

	export let form;
	export let data: PageServerData;
	let code = data.careplan.Code;
	let categoryId = data.careplan.CategoryId;
	let name = data.careplan.Name;
	let description = data.careplan.Description;
	let tags = data.careplan.Tags;
	let version = data.careplan.Version;

	//Original data
	let _code = code;
	let _categoryId = categoryId;
	let _name = name;
	let _description = description;
	let _tags = JSON.stringify(tags);
	let _version = version;
	let careplanCategories = data.careplanCategories;
	const r = careplanCategories.filter((careplanCategory) => {
		return careplanCategory.id === categoryId;
	});

	function handleReset() {
		name = _name;
		code = _code;
		categoryId = _categoryId;
		description = _description;
		tags = JSON.parse(_tags);
		version = _version;
	}

	const breadCrumbs = [
		{
			name: 'Careplan',
			path: careplansRoute
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
	action="?/updateCareplanAction"
	class="table-container border border-secondary-100 dark:!border-surface-700 my-2"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Care Plan</th>
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
				<td>Code *</td>
				<td>
					<input
						type="text"
						required
						name="code"
						placeholder="Enter code for plan  here..."
						class="input"
						bind:value={code}
					/>
					{#if form?.errors?.code}
						<p class="text-error-500 text-xs">{form?.errors?.code[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Category *</td>
				<td>
					<select name="categoryId" class="select select-primary w-full ">
						<option value={categoryId}>{r[0].Type}</option>
						{#each careplanCategories as category}
							<option value={category.id}>{category.Type}</option>
						{/each}
					</select>
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
