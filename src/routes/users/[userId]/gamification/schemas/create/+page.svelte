<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { showMessage } from '$lib/utils/message.utils';
	import Icon from '@iconify/svelte';
	// import { createDataTableStore, dataTableHandler } from '@skeletonlabs/skeleton';
	import { browser } from '$app/environment';
	import ItemDragDrop from '$lib/components/drag-and-drop/courses-drag-drop.svelte';
	import SelectedDragDropItems from '$lib/components/drag-and-drop/selected-courses-drag-drop.svelte';
	import { selectedItems } from '$lib/store/general.store';

	/////////////////////////////////////////////////////////////////////////////

	export let form;
  let eventTypes = [];
	let index = Number;
	eventTypes = eventTypes.map((item, index) => ({ ...item, index: index + 1 }));

	// const dataTableStore = createDataTableStore(eventTypes, {
	// 	search: '',
	// 	pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	// });

	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/gamification/schemas/create`;
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
			name: 'Create',
			path: createRoute
		}
	];

  let selectedEventType = [];
	$: selectedEventType;

  console.log("eventTypeIds",$selectedItems)
  let name = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	async function searchEventType(model) {
		let url = `/api/server/gamification/event-types/search?`;
		if (name) url += `&name=${name}`;
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});

		const response = await res.json();
		eventTypes = response.map((item, index) => ({ ...item, index: index + 1 }));
		console.log("eventTypes",eventTypes)
		// dataTableStore.updateSource(eventTypes);
	}

	$: if (browser) searchEventType({name: name });

	// dataTableStore.subscribe((model) => dataTableHandler(model));


</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createSchemaAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Schema</th>
				<th class="text-end">
					<a href={schemaRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
						required
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
					<textarea name="description" placeholder="Enter description here..." class="textarea" />
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type *</td>
				<td>
					<select
						name="type"
						required
						class="select w-full"
						placeholder="Select node type here..."
					>
							<option>Reuse-Existing-Instance</option>
              <option>Execute-Once</option>
              <option>Recreate-New-After-Execution</option>
					</select>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top w-1/4">Event Types *</td>
				<td class="flex flex-col gap-2 w-full">
					<input
						class="input"
						name="eventTypes"
						bind:value={name}
						type="search"
						placeholder="Search event type here..."
					/>

					<div class="flex flex-col gap-2">
						<ItemDragDrop title = 'Available Event Types' items={eventTypes} />
						<SelectedDragDropItems title = 'Add Event Types' sletectItems={selectedEventType} />
					</div>

					<input
						name="eventTypeIds"
						bind:value={$selectedItems}
						placeholder="Search event type here..."
						hidden
					/>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
