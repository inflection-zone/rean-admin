<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	///////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let name = data.schemaNode?.Name;
	let description = data.schemaNode?.Description?? null;
	let type = data.schemaNode?.Type?? null;
	let parentNode = data.schemaNode?.ParentNode?.Name ?? null;
	let actionType = data.schemaNode.Action?.ActionType ?? null;
	let actionName = data.schemaNode.Action.Name?? null;
	let message = data.schemaNode.Action?.OutputParams?.Message?? null;
	let destinationType = data.schemaNode.Action?.OutputParams?.DestinationType?? null;
	let outputTag = data.schemaNode.Action?.OutputParams?.OutputTag?? null;
	let recordType = data.schemaNode.Action?.InputParams?.RecordType?? null;
	let sourceType = data.schemaNode.Action?.InputParams?.SourceType?? null;
	let inputParams = data.schemaNode.Action?.InputParams?? null;
	console.log('schemaNode', data.schemaNode);

	const userId = $page.params.userId;
	const schemaId = $page.params.schemaId;
	const nodeId = $page.params.nodeId;
	const editRoute = `/users/${userId}/gamification/schemas/${schemaId}/nodes/${nodeId}/edit`;
	const viewRoute = `/users/${userId}/gamification/schemas/${schemaId}/nodes/${nodeId}/view`;
	const schemaRoute = `/users/${userId}/gamification/schemas`;
  const nodeRoute = `/users/${userId}/gamification/schemas/${schemaId}/nodes`;

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
			name: 'Nodes',
			path: nodeRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={editRoute} class="btn variant-filled-secondary ml-auto">
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
	</a>
</div>
<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Node</th>
				<th class="text-end">
					<a href={schemaRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Node Type</td>
				<td>{type}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Parent Node</td>
				<td>{parentNode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name</td>
				<td>{name}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Action Type</td>
				<td>{actionType}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Action Name</td>
				<td>{actionName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Input Parameters</td>
				<td />
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Record Type</td>
				<td>{recordType}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Source Type</td>
				<td>{sourceType}</td>
			</tr>
			{#if actionType === 'Extract-Data'}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td class="align-top">Filters</td>
					<td>
						{#if inputParams?.Filters?.length > 0 }
						{#each inputParams.Filters  as filter}
							<li>{filter.Key} : {filter.Value}</li>
						{/each}	
						{:else}
						<div>Filters are not defined</div>
						{/if}
					</td>
				</tr>
			{:else if actionType === 'Process-Data'}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Input Tag</td>
					<td>{inputParams.InputTag}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Data Action Type</td>
					<td>{inputParams.DataActionType}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Key Data Type</td>
					<td>{inputParams.KeyDataType}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Key Name</td>
					<td>{inputParams.KeyName}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Value Data Type</td>
					<td>{inputParams.ValueDataType}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Value Name</td>
					<td>{inputParams.ValueName}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Value</td>
					<td>{inputParams.Value}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Operator</td>
					<td>{inputParams.Operator}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Continuity Count</td>
					<td>{inputParams.ContinuityCount}</td>
				</tr>
			{:else if actionType === 'Compare-Data'}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Input Tag</td>
					<td>{inputParams.InputTag}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Secondary Input Tag</td>
					<td>{inputParams?.SecondaryInputTag ?? null}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Data Action Type</td>
					<td>{inputParams.DataActionType}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td class="align-top">Filters</td>
					<td>
						{#each inputParams.Filters  as filter}
							<li>{filter.Key} : {filter.Value}</li>
						{/each}	
					</td>
				</tr>
			{:else if actionType === 'Store-Data'}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Input Tag</td>
					<td>{inputParams.InputTag}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td class="align-top">Storage Key</td>
					<td>
						{#each inputParams.StorageKeys  as storageKey}
							<li>{storageKey.Key} : {storageKey.Value}</li>
						{/each}	
					</td>
				</tr>
			{/if}
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Output Parameters</td>
				<td />
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Message</td>
				<td>{message}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Output Tag</td>
				<td>{outputTag}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Destination Type</td>
				<td>{destinationType}</td>
			</tr>
		</tbody>
	</table>
</div>
