<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let title = data.assessmentTemplate.Title;
	let description = data.assessmentTemplate.Description;
	let displayCode = data.assessmentTemplate.DisplayCode;
	let assessmentType = data.assessmentTemplate.Type;
	let provider = data.assessmentTemplate.Provider;
	let providerAssessmentCode = data.assessmentTemplate.ProviderAssessmentCode;
	let serveListNodeChildrenAtOnce = data.assessmentTemplate.ServeListNodeChildrenAtOnce;
	let scoringApplicable = data.assessmentTemplate.ScoringApplicable;

	//Original data
	let _title = title;
	let _description = description;
	let _displayCode = displayCode;
	let _assessmentType = assessmentType;
	let _provider = provider;
	let _providerAssessmentCode = providerAssessmentCode;
	let _serveListNodeChildrenAtOnce = serveListNodeChildrenAtOnce;
	let _scoringApplicable = scoringApplicable;

	function handleReset() {
		title = _title;
		description = _description;
		displayCode = _displayCode;
		assessmentType = _assessmentType;
		provider = _provider;
		providerAssessmentCode = _providerAssessmentCode;
		serveListNodeChildrenAtOnce = _serveListNodeChildrenAtOnce;
		scoringApplicable = _scoringApplicable
	}

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const editRoute = `/users/${userId}/assessment-templates/${templateId}/edit`;
	const viewRoute = `/users/${userId}/assessment-templates/${templateId}/view`;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;

	const breadCrumbs = [
		{ name: 'Assessments', path: assessmentsRoutes },
		{ name: 'Edit', path: editRoute }
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
				<th>Edit Assessment Template</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Title *</td>
				<td>
					<input
						type="text"
						name="title"
						required
						bind:value={title}
						placeholder="Enter title here..."
						class="input w-full
						{form?.errors?.title ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.title}
						<p class="text-error-500 text-xs">{form?.errors?.title[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Description</td>
				<td>
					<textarea
						name="description"
						bind:value={description}
						placeholder="Enter description here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type *</td>
				<td>
					<select
						class="select w-full"
						name="type"
						bind:value={assessmentType}
						placeholder="Select type here..."
					>
						<option selected>{assessmentType}</option>
						<option>Daily Update</option>
						<option>Symptom</option>
						<option>Survey</option>
						<option>Protocol</option>
						<option>Custom</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Provider</td>
				<td>
					<input
						type="text"
						name="provider"
						bind:value={provider}
						placeholder="Enter provider here"
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Provider Assessment Code</td>
				<td>
					<input
						type="text"
						name="providerAssessmentCode"
						bind:value={providerAssessmentCode}
						placeholder="Enter provider assessment code here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Serve List Node Children At Once</td>
				<td>
					<input
						type="checkbox"
						name="serveListNodeChildrenAtOnce"
						bind:value={serveListNodeChildrenAtOnce}
						bind:checked={serveListNodeChildrenAtOnce}
						class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Scoring Applicable</td>
				<td>
					<input
						type="checkbox"
						name="scoringApplicable"
						class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
						bind:value={scoringApplicable}
						bind:checked={scoringApplicable}
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
