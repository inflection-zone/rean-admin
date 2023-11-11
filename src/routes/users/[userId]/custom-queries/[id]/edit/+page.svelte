<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';
	import type { PageServerData } from './$types';
	import { goto } from '$app/navigation';
	import toast from 'svelte-french-toast';

	//////////////////////////////////////////////////////////////////////
	
	export let data: PageServerData;
	let id = data.query.id;
	let name = data.query.Name;
	let description = data.query.Description;
	let query = data.query.Query;
	let tags = data.query.Tags ?? null;
	let format;

	//Original data
	let _name = name;
	let _description = description;
	let _query = query;
	let _tags = tags;

	function handleReset() {
		name= _name;
		description = _description;
		query = _query;
		tags = _tags;
	}

	const userId = $page.params.userId;
	const queryId = $page.params.id;
	const editRoute = `/users/${userId}/custom-queries/${queryId}/edit`;
	const viewRoute = `/users/${userId}/custom-queries/${queryId}/view`;
	const queryRoute = `/users/${userId}/custom-queries`;

	const breadCrumbs = [
		{
			name: 'Custom Queries',
			path: queryRoute
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];

	const onUpdate = async (name:string, description: string, format: string, query:string, tags:string[]) => {
		await updateQuery({
			queryId,
			name,
			description,
			format,
			query,
			tags
		});
	};

	async function updateQuery(model) {
		console.log("model---",model)
		const response = await fetch(`/api/server/custom-query/update-query`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
		const res = await response.json();
		const data = downloadFile(res)
		if(res.success === true){
			toast.success(`Query updated successfully, View downloads for data file`)
			goto(viewRoute);
		}
		else
		{
			toast.error(`Unable to updated query!`)
		}
	}

	function downloadFile(response) {
	const bufferData = response.Data.Buffer;
	let fileName = response.Data.FileName
	let blob;
	if(fileName.includes(".csv")){
		blob = new Blob([bufferData], { type: response.Data.MimeType });
	}
	else {
		blob = new Blob([JSON.stringify(bufferData)], { type: response.Data.MimeType });
	}
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = fileName
	a.click();
	URL.revokeObjectURL(url);
};
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
on:submit={async () => await onUpdate(name, description, format, query, tags)}
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Query</th>
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
						name="name"
						bind:value={name}
						placeholder="Enter query here..."
						class="input w-full"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>
					<textarea bind:value={description} class="textarea" name="description" placeholder="Enter description here..." />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Add Query</td>
				<td>
					<textarea bind:value={query} class="textarea" name="description" placeholder="Enter description here..." />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
          <InputChip chips="variant-filled-error rounded-2xl" name="tags" bind:value={tags} />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Format *</td>
				<td>
					<select
						name="format"
						required
						class="select w-full"
						placeholder="Select forma here..."
						bind:value={format}
					>
						<option value=CSV>CSV</option>
						<option value=JSON>JSON</option>
					</select>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
