<script lang="ts">
  import type { PageServerData } from './$types';
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
  import InputChip from '$lib/components/input-chips.svelte';
	import Icon from '@iconify/svelte';

  ///////////////////////////////////////////////////////////

  const userId = $page.params.userId;
  const assessmentId = $page.params.userId;
  const assetRoute = `/users/${userId}/careplan/assets`;
  const editRoute = `/users/${userId}/careplan/assets/assessments/${assessmentId}/edit`;
  const viewRoute = `/users/${userId}/careplan/assets/assessments/${assessmentId}/view`;
  const assessmentRoute = `/users/${userId}/careplan/assets/assessments/create`;

  export let form;
  export let data: PageServerData;
  let assetCode = data.assessment.AssetCode;
  let name = data.assessment.Name;
  let description = data.assessment.Description;
  let template = data.assessment.Template;
  let tags = data.assessment.Tags;
  let version = data.assessment.Version;

  //Original data
  let _name = name;
  let _description = description;
  let _tags = JSON.stringify(tags);
  let _template = template;
  let _version = version;

  function handleReset() {
    name = _name;
    description = _description;
    template = _template;
    tags = JSON.parse(_tags);
    version = _version;
  }

  const breadCrumbs = [
    {
      name: 'Assets',
      path: assetRoute
    },
    {
      name: 'Assessment',
      path: assessmentRoute
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
	action="?/updateAssessmentAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Assessment</th>
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
				<td class="align-top">Template</td>
				<td>
          <textarea
          class="textarea textarea-primary w-full"
          placeholder="Enter assessment template here..."
          bind:value={template}
          name="template"
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
