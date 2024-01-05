<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';
	import KeyValue from '$lib/components/key-value/key-value.svelte';
	import List from '$lib/components/key-value/list.svelte';
	import { items } from '$lib/store/key.value.store';
    import { enhance } from '$app/forms';

	/////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;

	const eventActionTypes = data.eventActionTypes;
	const inputSourceTypes = data.inputSourceTypes;
  const outputSourceTypes = data.outputSourceTypes;
  const dataActionTypes = data.dataActionTypes;
  const operandDataTypes = data.operandDataTypes;
  const logicalOpratorTypes = data.logicalOpratorTypes;
	const parentNodes = data.nodes;
  const node = data.schemaNode;
	console.log("node", node);
	$:console.log("items", $items)
	
	let filtersData = node.Action.InputParams?.Filters ?? [];
	
	if(filtersData.length > 0){
		for(const item of filtersData){
			$items.push(item)
		}
	}

	let storageKeys = node.Action?.InputParams?.StorageKeys ?? [];
	if(storageKeys.length > 0){
		for(const item of storageKeys){
			$items.push(item)
		}
	}

$:console.log("items", $items)

  let nodeType =  node.Type;
  let name = node.Name;
  let description = node.Description;
  let actionType = data.schemaNode.Action?.ActionType ?? null;
	let actionName = data.schemaNode.Action.Name?? null;
	let message = data.schemaNode.Action?.OutputParams?.Message?? null;
	let destinationType = data.schemaNode.Action?.OutputParams?.DestinationType?? null;
	let outputTag = data.schemaNode.Action?.OutputParams?.OutputTag?? null;
	let recordType = data.schemaNode.Action?.InputParams?.RecordType?? null;
	let sourceType = data.schemaNode.Action?.InputParams?.SourceType?? null;
	let inputParams = data.schemaNode.Action?.InputParams?? null;
  	//Original data
	let _nodeType = nodeType;
  let _name = name;
	let _description = description;
  let _actionType = actionType;

  function handleReset() {
		nodeType = _nodeType;
		name = _name;
		description = _description;
    actionType = _actionType;
	}
  let selectedEventActionType = actionType;

	const onSelectEventActionType = (val) => {
		selectedEventActionType = val.target.value;
	};
	const userId = $page.params.userId;
	const schemaId = $page.params.schemaId;
  const createRoute = `/users/${userId}/gamification/schemas/${schemaId}/nodes/create`;
  const editRoute = `/users/${userId}/gamification/schemas/${schemaId}/edit`;
	const viewRoute = `/users/${userId}/gamification/schemas/${schemaId}/view`;
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
			name: 'Edit',
			path: editRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateNodeAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Node</th>
				<th class="text-end">
					<a href={schemaRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Node Type *</td>
				<td>
					<select
						name="nodeType"
						placeholder="Select node type here..."
						class="select w-full"
            bind:value={nodeType}
					>
            <option selected>{nodeType}</option>
            <option >Execution-Node</option>
            <option>Rule-Node</option>
            <option>Message-Node</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700 hidden">
				<td>Parent Node *</td>
				<td>
					<select
						name="parentNodeId"
						required
						class="select w-full"
						placeholder="Select node type here..."
						hidden
					>
					<option selected value={node.ParentNode?.id}>{node.ParentNode}</option>
					{#each parentNodes as node}
          
					<option value={node.id}>{node.Name}</option>
				{/each}
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name*</td>
				<td>
					<input
						type="text"
						name="name"
						required
						placeholder="Enter name here..."
						class="input w-full
						{form?.errors?.name ? 'border-error-300 text-error-500' : ''}"
            bind:value= {name}
					/>
					{#if form?.errors?.name}
						<p class="text-error-500 text-xs">{form?.errors?.name[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>
					<textarea name="description" placeholder="Enter description here..." bind:value={description} class="input" />
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Action Type*</td>
				<td>
					<select
						name="actionType"
						placeholder="Select node type here..."
						class="select w-full"
            on:change={(val) => onSelectEventActionType(val)}
            bind:value={actionType}
					>
           <option selected>{actionType}</option>
            {#each eventActionTypes as type}
            <option value={type}>{type}</option>
            {/each}   
					</select>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Action Name*</td>
				<td>
					<input
						type="text"
						name="actionName"
						required
						placeholder="Enter name here..."
						class="input w-full"
            bind:value={actionName}
					/>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Input Parameters</td>
        <td></td>
			</tr>
   
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Record Type*</td>
				<td>
					<select
						name="recordType"
						placeholder="Select record type here..."
						class="select w-full"
            bind:value={recordType}
					>
           <option selected>{recordType}</option>
            <option>Medication</option>
						<option>Badge</option>
					</select>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Source Type*</td>
				<td>
					<select
						name="sourceType"
						placeholder="Select node type here..."
						class="select w-full"
					>
					<option selected>{sourceType}</option>
          {#each inputSourceTypes as inputSourceType}
          <option value={inputSourceType}>{inputSourceType}</option>
          {/each}   
					</select>
				</td>
			</tr>
      {#if selectedEventActionType === 'Extract-Data'}
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Filters</td>	
					<td>
						<KeyValue/>
						<List/>
						<input type="text" hidden name=filters value={JSON.stringify($items)}>
					</td>
			</tr>
      {:else if selectedEventActionType === 'Process-Data'}
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Input Tag</td>
				<td>
					<input
						type="text"
						name="inputTag"
						placeholder="Enter input tag here..."
						class="input w-full"
						bind:value={inputParams.InputTag}
					/>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Data Action Type*</td>
				<td>
					<select
						name="dataActionType"
						placeholder="Select data action type here..."
						class="select w-full"
						bind:value={inputParams.DataActionType}
					>
					<option selected>{inputParams.DataActionType}</option>
          {#each dataActionTypes as dataActionType}
          <option value={dataActionType}>{dataActionType}</option>
          {/each}   
					</select>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Key Data Type*</td>
				<td>
					<select
						name="keyDataType"
						placeholder="Select key data type here..."
						class="select w-full"
						bind:value={inputParams.KeyDataType}
					>
					<option selected>{inputParams.KeyDataType}</option>
          {#each operandDataTypes as operandDataType}
          <option value={operandDataType}>{operandDataType}</option>
          {/each}   
					</select>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Key Name</td>
				<td>
					<input
						type="text"
						name="keyName"
						placeholder="Enter key name here..."
						class="input w-full"
						bind:value={inputParams.KeyName}
					/>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Value Data Type</td>
				<td>
					<select
						name="valueDataType"
						placeholder="Select data action type here..."
						class="select w-full"
						bind:value={inputParams.ValueDataType}
					>
					<option selected>{inputParams.ValueDataType}</option>
          {#each operandDataTypes as operandDataType}
          <option value={operandDataType}>{operandDataType}</option>
          {/each}   
					</select>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Value Name</td>
				<td>
					<input
						type="text"
						name="valueName"
						placeholder="Enter value name here..."
						class="input w-full"
						bind:value={inputParams.ValueName}
					/>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Value</td>
				<td>
					<!-- <input
						type="text"
						name="value"
						placeholder="Enter value here..."
						class="input w-full"
					/> -->
					<input
					type="checkbox"
					name="value"
					class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
					bind:value={inputParams.Value}
					bind:checked={inputParams.Value}
				/>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Operator</td>
				<td>
					<select
						name="operator"
						placeholder="Select data action type here..."
						class="select w-full"
						bind:value={inputParams.Operator}
					>
					<option selected>{inputParams.Operator}</option>
          {#each logicalOpratorTypes as logicalOpratorType}
          <option value={logicalOpratorType}>{logicalOpratorType}</option>
          {/each}   
					</select>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Continuity Count</td>
				<td>
					<input
						type="number"
						name="continuityCount"
						placeholder="Enter continuty count here..."
						class="input w-full"
						bind:value={inputParams.ContinuityCount}
					/>
				</td>
			</tr>
      {:else if selectedEventActionType === 'Compare-Data'}
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Input Tag</td>
				<td>
					<input
						type="text"
						name="inputTag"
						placeholder="Enter input tag here..."
						class="input w-full"
						bind:value={inputParams.InputTag}
					/>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Secondary Input Tag</td>
				<td>
					<input
						type="text"
						name="secondaryInputTag"
						placeholder="Enter secondary input tag here..."
						class="input w-full"
						bind:value={inputParams.SecondaryInputTag}
					/>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Data Action Type*</td>
				<td>
					<select
						name="dataActionType"
						placeholder="Select data action type here..."
						class="select w-full"
						bind:value={inputParams.DataActionType}
					>
          {#each dataActionTypes as dataActionType}
          <option value={dataActionType}>{dataActionType}</option>
          {/each}   
					</select>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Filters</td>
				<td>
					<KeyValue/>
					<List/>
					<input type="text" name=filters hidden value={JSON.stringify($items)}>
				</td>
			</tr>
      {:else if selectedEventActionType === 'Store-Data'}
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Input Tag</td>
				<td>
					<input
						type="text"
						name="inputTag"
						placeholder="Enter input tag here..."
						class="input w-full"
						bind:value={inputParams.InputTag}
					/>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Storage Keys</td>
				<td>
					<KeyValue/>
					<List/>
					<input type="text" hidden name=storageKeys value={JSON.stringify($items)}>
				</td>
			</tr>
      {/if}
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Output Parameters</td>
        <td></td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Output Tag</td>
				<td>
					<input
						type="text"
						name="outputTag"
						placeholder="Enter input tag here..."
						class="input w-full"
            bind:value={outputTag}
					/>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Message</td>
				<td>
					<input
						type="text"
						name="message"
						placeholder="Enter message here..."
						class="input w-full"
            bind:value={message}
					/>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Destination Type</td>
				<td>
					<select
						name="destinationType"
						placeholder="Select destination type here..."
						class="select w-full"
            bind:value={destinationType}
					>
          <option selected>{destinationType}</option>
          {#each outputSourceTypes as outputSourceType}
          <option value={outputSourceType}>{outputSourceType}</option>
          {/each}   
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


