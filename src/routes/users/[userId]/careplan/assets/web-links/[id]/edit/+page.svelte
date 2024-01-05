<script lang="ts">
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';
    import { enhance } from '$app/forms';

	//////////////////////////////////////////////////////////////////////////

  const userId = $page.params.userId;
	const webLinkId = $page.params.id;
	const assetRoute = `/users/${userId}/careplan/assets`;
	const editRoute = `/users/${userId}/careplan/assets/web-links/${webLinkId}/edit`;
	const viewRoute = `/users/${userId}/careplan/assets/web-links/${webLinkId}/view`;
	const weblinkRoute = `/users/${userId}/careplan/assets/web-links/create`;

  export let form;
	export let data: PageServerData;
	let assetCode = data.webLink.AssetCode;
	let name = data.webLink.Name;
	let description = data.webLink.Description;
	let pathUrl = data.webLink.Url;
	let tags = data.webLink.Tags;
	let version = data.webLink.Version;

	//Original data
	let _name = name;
	let _description = description;
	let _tags = JSON.stringify(tags);
	let _pathUrl = pathUrl;
	let _version = version;

	function handleReset() {
		name = _name;
		description = _description;
		pathUrl = _pathUrl;
		tags = JSON.parse(_tags);
		version = _version;
	}

	const breadCrumbs = [
		{
			name: 'Assets',
			path: assetRoute
		},
		{
			name: 'Web-Link',
			path: weblinkRoute
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
	action="?/updateWebLinkAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Web Link</th>
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
				<td>Url</td>
				<td>
					<input
						type="url"
						placeholder="Enter url here..."
						bind:value={pathUrl}
						class="input"
						name="pathUrl"
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