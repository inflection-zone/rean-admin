<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { scoringApplicableCondition } from '$lib/store/general.store';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';
	import Choice from './choice.svelte';
    import { enhance } from '$app/forms';

	/////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;

	const queryResponseTypes = data.queryResponseTypes;
	const assessmentNodes = data.assessmentNodes;

	let selectedNodeType = 'Question';
	let selectedQueryType = '';

	const onSelectNodeType = (val) => {
		selectedNodeType = val.target.value;
	};

	const onSelectQueryResponseType = (val) => {
		selectedQueryType = val.target.value;
	};

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const createRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/create`;
	const assessmentNodeRoutes = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes`;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;
	const assessmentTemplateView = `/users/${userId}/assessment-templates/${templateId}/view`;

	const breadCrumbs = [
		{
			name: 'Assessments',
			path: assessmentsRoutes
		},
		{
			name: 'Assessment-View',
			path: assessmentTemplateView
		},
		{
			name: 'Assessment-Nodes',
			path: assessmentNodeRoutes
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
	action="?/createAssessmentNodeAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Assessment Node</th>
				<th class="text-end">
					<a href={assessmentNodeRoutes} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Node Type *</td>
				<td>
					<select
						name="nodeType"
						placeholder="Select node type here..."
						class="select w-full"
						on:change={(val) => onSelectNodeType(val)}
					>
						<option>Question</option>
						<option>Message</option>
						<option>Node list</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Parent Node *</td>
				<td>
					<select
						name="parentNodeId"
						required
						class="select w-full"
						placeholder="Select node type here..."
					>
						{#each assessmentNodes as node}
							<option value={node.id}>{node.NodeType} - {node.Title} - {node.DisplayCode}</option>
						{/each}
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Title *</td>
				<td>
					<input
						type="text"
						name="title"
						required
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
					<textarea name="description" placeholder="Enter description here..." class="input" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Sequence</td>
				<td>
					<input type="number" name="sequence" placeholder="Enter sequence here..." min="1" class="input" />
				</td>
			</tr>
			{#if selectedNodeType === 'Question'}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td class="align-top">Query Response Type *</td>
					<td>
						<select
							id="mySelect"
							name="queryType"
							class="select select-info w-full"
							placeholder="Select query type here..."
							on:change={(val) => onSelectQueryResponseType(val)}
						>
							{#each queryResponseTypes as responseType}
								<option value={responseType}>{responseType}</option>
							{/each}
						</select>
					</td>
				</tr>
				{#if $scoringApplicableCondition === true}
					{#if selectedQueryType === 'Single Choice Selection' || selectedQueryType === 'Multi Choice Selection'}
						<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
							<td class="align-top">Options</td>
							<td>
								<Choice />
							</td>
						</tr>
						<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
							<td>Resolution Score *</td>
							<td>
								<input
									type="number"
									name="resolutionScore"
									placeholder="Enter resolution score here..."
									min="1"
									class="input w-full
									 {form?.errors?.resolutionScore ? 'border-error-300 text-error-500' : ''}"
									value={form?.data?.resolutionScore ?? ''}
								/>
							</td>
						</tr>
					{:else if selectedQueryType === 'Boolean'}
						<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
							<td>Resolution Score *</td>
							<td>
								<input
									type="number"
									name="resolutionScore"
									placeholder="Enter resolution score here..."
									min="1"
									class="input w-full
									{form?.errors?.resolutionScore ? 'border-error-300 text-error-500' : ''}"
									value={form?.data?.resolutionScore ?? ''}
								/>
							</td>
						</tr>
					{/if}
				{:else if selectedQueryType === 'Single Choice Selection' || selectedQueryType === 'Multi Choice Selection'}
					<tr>
						<td class="align-top">Options</td>
						<td>
							<Choice />
						</td>
					</tr>
				{/if}
			{:else if selectedNodeType === 'Message'}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td class="align-top">Message *</td>
					<td>
						<textarea
							name="message"
							required
							placeholder="Enter message here..."
							class="textarea w-full
						{form?.errors?.message ? 'border-error-300 text-error-500' : ''}"
						/>
					</td>
				</tr>
			{:else}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Serve List Node Children At Once</td>
					<td class="flex gap-2">
						<input
							type="checkbox"
							name="serveListNodeChildrenAtOnce"
							value="true"
							class="checkbox !border !border-secondary-100 dark:!border-surface-700"
						/>
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
