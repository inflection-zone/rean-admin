<script lang="ts">
  import type { PageServerData } from './$types';
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import InputChip from '$lib/components/input-chips.svelte';
	import Icon from '@iconify/svelte';
    import { enhance } from '$app/forms';
 
  ////////////////////////////////////////////////////////////////////////////////////////////

  const userId = $page.params.userId;
  const messageId = $page.params.id;
  const assetRoute = `/users/${userId}/careplan/assets`;
  const editRoute = `/users/${userId}/careplan/assets/messages/${messageId}/edit`;
  const viewRoute = `/users/${userId}/careplan/assets/messages/${messageId}/view`;
  const messageRoute = `/users/${userId}/careplan/assets/messages/create`;

  export let form;
  export let data: PageServerData;
  let assetCode = data.msg.AssetCode;
  let name = data.msg.Name;
  let description = data.msg.Description;
  let messageType = data.msg.MessageType;
  let tags = data.msg.Tags;
  let pathUrl = data.msg.Url;
  let version = data.msg.Version;

  //Original data
  let _name = name;
  let _description = description;
  let _messagetype = messageType;
  let _tags = JSON.stringify(tags);
  let _pathUrl = pathUrl;
  let _version = version;

  function handleReset() {
    name = _name;
    description = _description;
    messageType = _messagetype;
    tags = JSON.parse(_tags);
    pathUrl = _pathUrl;
    version = _version;
  }

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
      name: 'Edit',
      path: editRoute
    }
  ];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/updateMessageAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Message</th>
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
						placeholder="Enter name here..."
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
				<td>Message Type</td>
				<td>
					<select class="select" bind:value={messageType} name="messageType">
            <option>Educational</option>
            <option>Status</option>
            <option>Unknown</option>
          </select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" bind:value={tags} />
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Url</td>
				<td>
					<input
            type="url"
            placeholder="Enter url here..."
            name="pathUrl"
            bind:value={pathUrl}
            class="input"
          />
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