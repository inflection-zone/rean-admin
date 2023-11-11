<script lang="ts">
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import InputChip from '$lib/components/input-chips.svelte';
	import Icon from '@iconify/svelte';

	//////////////////////////////////////////////////////////////////////
	
  export let form;
  const userId = $page.params.userId;
  const assetRoute = `/users/${userId}/careplan/assets`;
  const createRoute =`/users/${userId}/careplan/assets/biometric/create`;
  const biometricRoute = `/users/${userId}/careplan/assets/biometrics/create`;
  const breadCrumbs= [
    {
      name: 'Assets',
      path: assetRoute
    },
    {
      name: 'Biometric',
      path: biometricRoute
    },
    {
      name: 'Create',
      path: createRoute
    },   
  ]

</script>

<BreadCrumbs  crumbs={breadCrumbs}  />

<form
	method="post"
	action="?/createBiometricsAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Biometrics</th>
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
				<td>Biometrics Type</td>
				<td>
					<select name="biometricsType" class="select">
            <option disabled selected>Select biometrics type</option>
            <option>Blood pressure</option>
            <option>Blood glucose</option>
            <option>Blood oxygen saturation</option>
            <option>Body height</option>
            <option>Body weight</option>
            <option>Body temperature</option>
            <option>Pulse</option>
            <option>Other</option>
          </select>
				</td>
			</tr>
      <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Measurement Unit</td>
				<td>
					<input
            type="text"
            required
            name="measurementUnit"
            placeholder="Enter measurement unit here..."
            class="input input-bordered input-primary w-full "
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
					<input type="text" name="version" class="input" placeholder="V 1.0" />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>