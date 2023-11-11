<script lang="ts">
  import type { PageServerData } from './$types';
  export let data: PageServerData;
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
  import InputChip from '$lib/components/input-chips.svelte';
	import Icon from '@iconify/svelte';

  //////////////////////////////////////////////////////////////////////
  
  export let form;
  const userId = $page.params.userId;
  const careplanId = $page.params.id;
  const createRoute = `/users/${userId}/careplan/careplans/create`;
  const editRoute = `/users/${userId}/careplan/careplans/${careplanId}/edit`;
  const viewRoute = `/users/${userId}/careplan/careplans/${careplanId}/view`;
  const careplansRoute =  `/users/${userId}/careplan/careplans`;

  let careplanCategories = data.careplanCategories;

  const breadCrumbs = [
    {
      name: 'Careplan',
      path: careplansRoute
    },
    {
      name: 'Create',
      path: createRoute
    }
  ];
</script>

<BreadCrumbs crumbs={breadCrumbs} />
  
<form
	method="post"
	action="?/createCareplanAction"
	class="table-container border border-secondary-100 dark:!border-surface-700 my-2"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Care Plan</th>
				<th class="text-end">
					<a href={careplansRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
            <option disabled selected>Select category of plan here...</option>
            {#each careplanCategories as category}
              <!-- <option>{category.id}</option> -->
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
        />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
          <InputChip chips="variant-filled-error rounded-2xl" name="tags" />
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
          />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
