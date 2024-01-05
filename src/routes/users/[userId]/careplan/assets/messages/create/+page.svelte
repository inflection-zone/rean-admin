<script lang="ts">
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';
    import { enhance } from '$app/forms';

  //////////////////////////////////////////////////////////////////////

  export let form;
  const userId = $page.params.userId;
  const assetRoute = `/users/${userId}/careplan/assets`;
  const createRoute = `/users/${userId}/careplan/assets/messages/create`;
  const messageRoute = `/users/${userId}/careplan/assets/messages/create`;

  const breadCrumbs = [
    {
      name: 'Assets',
      path: assetRoute
    },
    {
      name: 'Message',
      path: messageRoute
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
	action="?/createMessageAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Message</th>
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
					<textarea class="textarea" name="description" placeholder="Enter description here..." />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Message Type</td>
				<td>
          <select class="select" name="messageType">
            <option disabled selected>Select message type</option>
            <option>Educational</option>
            <option>Status</option>
            <option>Unknown</option>
          </select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" />
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Url</td>
				<td>
					<input type="url" placeholder="Enter url here..." class="input" name="pathUrl" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Version</td>
				<td>
					<input type="text" name="version" class="input" placeholder="V 1.0" />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
