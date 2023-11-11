<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import InputChip from '$lib/components/input-chips.svelte';
	import type { PageServerData } from './$types';
	
	///////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let id = data.KnowledgeNugget.id;
	let topicName = data.KnowledgeNugget.TopicName;
	let briefInformation = data.KnowledgeNugget.BriefInformation;
	let detailedInformation = data.KnowledgeNugget.DetailedInformation;
	let additionalResources_ = data.KnowledgeNugget.AdditionalResources;
	let additionalResources = additionalResources_.join(', ');
	let tags = data.KnowledgeNugget.Tags;

	//Original data
	let _topicName = topicName;
	let _briefInformation = briefInformation;
	let _detailedInformation = detailedInformation;
	let _additionalResources = additionalResources;
	let _tags = tags;
	let retrievedTags = '';
	let tagsPlaceholder = 'Enter a tags here...';

	function handleTags(event) {
		retrievedTags = event.detail.tags;
	}

	function handleReset() {
		topicName = _topicName;
		briefInformation = _briefInformation;
		detailedInformation = _detailedInformation;
		additionalResources = _additionalResources;
		tags = _tags;
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/knowledge-nuggets/${id}/edit`;
	const viewRoute = `/users/${userId}/knowledge-nuggets/${id}/view`;
	const knowledgeNuggetsRoute = `/users/${userId}/knowledge-nuggets`;

	const breadCrumbs = [
		{
			name: 'Knowledge-Nuggets',
			path: knowledgeNuggetsRoute
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
	action="?/updateKnowledgeNuggetAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Knowledge Nugget</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
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
						bind:value={topicName}
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
						bind:value={briefInformation}
						placeholder="Enter  brief information here..."
						class="textarea w-full {form?.errors?.briefInformation
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.briefInformation}
						<p class="text-error-500 text-xs">{form?.errors?.briefInformation[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Detailed Information</td>
				<td>
					<textarea
						name="detailedInformation"
						bind:value={detailedInformation}
						placeholder="Enter detailed information here..."
						class="textarea w-full {form?.errors?.detailedInformation
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.detailedInformation}
						<p class="text-error-500 text-xs">{form?.errors?.detailedInformation[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Additional Resources</td>
				<td>
					<input
						type="text"
						name="additionalResources"
						bind:value={additionalResources}
						class="input w-full"
						placeholder="Enter additional resource here..."
					/>
					{#if form?.errors?.additionalResources}
						<p class="text-error-500 text-xs">{form?.errors?.additionalResources[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Tags</td>
				<td>
					<InputChip chips="variant-filled-error rounded-2xl" name="tags" bind:value={tags} />
					{#if form?.errors?.tags}
						<p class="text-error-500 text-xs">{form?.errors?.tags[0]}</p>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
