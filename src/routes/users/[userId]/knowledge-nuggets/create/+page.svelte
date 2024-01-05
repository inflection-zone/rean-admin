<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';
    import { enhance } from '$app/forms';

	/////////////////////////////////////////////////////////////////////////////

	export let form;
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/knowledge-nuggets/create`;
	const knowledgeNuggetsRoute = `/users/${userId}/knowledge-nuggets`;

	const breadCrumbs = [
		{
			name: 'Knowledge-Nuggets',
			path: knowledgeNuggetsRoute,
			home: true
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
	action="?/createKnowledgeNuggetAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Knowledge Nugget</th>
				<th class="text-end">
					<a href={knowledgeNuggetsRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
						name="topicName"
						required
						placeholder="Enter name here..."
						class="input w-full {form?.errors?.topicName ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.topicName}
						<p class="text-error-500 text-xs">{form?.errors?.topicName[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Brief Information</td>
				<td>
					<textarea
						name="briefInformation"
						placeholder="Enter  brief information here..."
						class="textarea"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Detailed Information</td>
				<td>
					<textarea
						name="detailedInformation"
						placeholder="Enter detailed information here..."
						class="textarea"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Additional Resources</td>
				<td>
					<input
						type="text"
						name="additionalResources"
						class="input w-full"
						placeholder="Enter additional resource here..."
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" />
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
