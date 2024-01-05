<script lang="ts">
  import type { PageServerData } from './$types';
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';
    import { enhance } from '$app/forms';

  ///////////////////////////////////////////////////////////////////////////
  
  const userId = $page.params.userId;
  const actionPlanId = $page.params.id;
  const assetRoute = `/users/${userId}/careplan/assets`;
  const editRoute = `/users/${userId}/careplan/assets/action-plans/${actionPlanId}/edit`;
  const viewRoute = `/users/${userId}/careplan/assets/action-plans/${actionPlanId}/view`;
  const actionPlanRoute = `/users/${userId}/careplan/assets/action-plans/create`;

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  export let form;
  export let data: PageServerData;
  let assetCode = data.actionPlan.AssetCode;
  let name = data.actionPlan.Name;
  let description = data.actionPlan.Description;
  let tags = data.actionPlan.Tags;
  let version = data.actionPlan.Version;

  //Original data
  let _name = name;
  let _description = description;
  let _tags = JSON.stringify(tags);
  let _version = version;

  function handleReset() {
    name = _name;
    description = _description;
    tags = JSON.parse(_tags);
    version = _version;
  }

  const breadCrumbs = [
    {
      name: 'Assets',
      path: assetRoute
    },
    {
      name: 'Action-Plan',
      path: actionPlanRoute
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
	action="?/updateActionPlanAction"
	class="table-container border border-secondary-100 dark:!border-surface-700 my-2"
  use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Action-Plan</th>
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
          placeholder="Enter action plan name here..."
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