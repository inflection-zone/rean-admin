<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import ItemsDragDrop from '$lib/components/drag-and-drop/courses-drag-drop.svelte';
	import SelectedItems from '$lib/components/drag-and-drop/selected-courses-drag-drop.svelte';
	import { selectedItems } from '$lib/store/general.store';
	import Icon from '@iconify/svelte';
	// import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types'
	
	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let eventTypes = data.eventTypes;
	let schemaName = data.schema.Name;
	let description = data.schema.Description;
	let type = data.schema.Type;
  let eventType = data.schema.EventTypes;
	let itemsId: string[] = eventTypes.map((item) => item.id);
	selectedItems.set(itemsId);
	$: eventType;
  console.log("schema",data.schema)
	//Original data
	let _name = schemaName;
	let _description = description;

	function handleReset() {
		schemaName = _name;
  	description = _description;
	}
  const userId = $page.params.userId;
  const schemaId = $page.params.schemaId;
  const editRoute = `/users/${userId}/gamification/schemas/${schemaId}/edit`;
	const viewRoute = `/users/${userId}/gamification/schemas/${schemaId}/view`;
	const schemaRoute = `/users/${userId}/gamification/schemas`;

	const breadCrumbs = [
		{
			name: 'Gamification',
			path: schemaRoute
		},
    {
			name: 'Schemas',
			path: schemaRoute
		},
		{
			name: 'Edit',
			path: editRoute
		}
	];

	// const dataTableStore = createDataTableStore(eventTypes, {
	// 	search: ''
	// });

</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateSchemaAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Schema</th>
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
						bind:value={schemaName}
						placeholder="Enter name here..."
						class="input w-full {form?.errors?.name ? 'border-error-300 text-error-500' : ''}"
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
						name="description"
						bind:value={description}
						placeholder="Enter description here..."
						class="textarea w-full"
					/>
			
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type *</td>
				<td>
					<select
						name="type"
						class="select w-full"
						placeholder="Select node type here..."
						bind:value= {type}
					>
					    <option selected>{type}</option>
							<option>Reuse-Existing-Instance</option>
              <option>Execute-Once</option>
              <option>Recreate-New-After-Execution</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Event Types *</td>
				<td>
					<!-- <input
						class="input mb-3"
						bind:value={$dataTableStore.search}
						type="search"
						placeholder="Search course here..."
					/> -->
					<div class="mb-4 mt-1">
						<ItemsDragDrop title='Available event types' items={eventTypes} />
					</div>
					<div>
						<SelectedItems title='Add event types to schema' sletectItems={eventType} />
					</div>
					<input
						name="eventTypeIds"
						bind:value={$selectedItems}
						placeholder="Search event types here..."
						hidden
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
