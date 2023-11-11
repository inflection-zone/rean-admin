<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';
	import toast from 'svelte-french-toast';
	import { goto } from '$app/navigation';

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let form;
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/custom-queries/create`;
	const queryRoute = `/users/${userId}/custom-queries`;

	const breadCrumbs = [
		{ name: 'Custom Queries', path: queryRoute },
		{ name: 'Create', path: createRoute }
	];

	let name ='';
	let description = '';
	let format;
	let query = '';
	let tags = [];

	const onQuerySubmit = async (name:string, description: string, format: string, query:string, tags:string[]) => {
		await executeQuery({
			name,
			description,
			format,
			query,
			tags
		});
	};

	async function executeQuery(model) {
		console.log("model---",model)
		const response = await fetch(`/api/server/custom-query/execute-query`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
	  const res = await response.json();
		console.log("response-------",res)
		const data = downloadFile(res)
		if(res.success === true){
			toast.success(`Query executed successfully, View downloads for data file`)
			goto(queryRoute);
		}
		else
		{
			toast.error(`Unable to execute query!`)
		}
		console.log("response",res)
		console.log("data", data);
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
}


</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	on:submit={async () => await onQuerySubmit(name, description, format, query, tags)}
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Query</th>
				<th class="text-end">
					<a href={queryRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
						class="input w-full {form?.errors?.name ? 'border-error-300' : 'border-primary-200'}"
					/>
					{#if form?.errors?.name}
						<p class="text-error-500 text-xs">{form?.errors?.name[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>
					<textarea bind:value={description} class="textarea" name="description" placeholder="Enter description here..." />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Query *</td>
				<td>
					<textarea bind:value={query} class="textarea" name="query" placeholder="Add query here..." />
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
					  <option selected disabled>Select response format</option>
						<option value=CSV>CSV</option>
						<option value=JSON>JSON</option>
					</select>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
