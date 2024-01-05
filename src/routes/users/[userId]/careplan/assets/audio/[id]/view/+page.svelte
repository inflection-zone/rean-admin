<script lang="ts">
  import type { PageServerData } from './$types';
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const userId = $page.params.userId;
  const audioId = $page.params.id;
  const assetRoute = `/users/${userId}/careplan/assets`;
  const editRoute = `/users/${userId}/careplan/assets/audio/${audioId}/edit`;
  const viewRoute = `/users/${userId}/careplan/assets/audio/${audioId}/view`;
  const audioRoute = `/users/${userId}/careplan/assets/audio/create`;

  export let data: PageServerData;
  let assetCode = data.audio.AssetCode;
  let name = data.audio.Name;
	let transcript = (data.audio.Transcript !== null && data.audio.Transcript !== '') ? data.audio.Transcript : 'Not specified';
	let pathUrl = (data.audio.Url !== null && data.audio.Url !== '') ? data.audio.Url : 'Not specified';
  let tags = data.audio.Tags;
  let version = data.audio.Version;

  const breadCrumbs = [
    {
      name: 'Assets',
      path: assetRoute
    },
    {
      name: 'Audio',
      path: audioRoute
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

<div class="table-container my-2 border border-secondary-100 dark:!border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Audio</th>
				<th class="text-end">
					<a href={assetRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
				<td>Name</td>
				<td>{name}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Transcript</td>
				<td>{transcript}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Url</td>
				<td>{pathUrl}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Tags</td>
				<td>
					{#if tags.length <= 0}
						<span class="span">Tags not specified</span>
					{:else}
						<span class="span">{tags}</span>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Version</td>
				<td>{version}</td>
			</tr>
		</tbody>
	</table>
</div>