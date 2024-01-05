<script lang="ts">
    import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
  import InputChip from '$lib/components/input-chips.svelte';
	import Icon from '@iconify/svelte';

  ////////////////////////////////////////////////////////////////////////////////

  export let form;
  const userId = $page.params.userId;
  const assetRoute = `/users/${userId}/careplan/assets`;
  const createRoute = `/users/${userId}/careplan/assets/checkups/create`;
  const checkupRoute = `/users/${userId}/careplan/assets/checkups/create`;

  const breadCrumbs = [
    {
      name: 'Assets',
      path: assetRoute
    },
    {
      name: 'Checkup',
      path: checkupRoute
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
	action="?/createCheckupAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
  use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Checkup</th>
				<th class="text-end">
					<a href={assetRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
