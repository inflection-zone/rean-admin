<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import UpdateScoringCondition from '$lib/components/modal/update.scoring.condition.modal.svelte';
	import { scoringApplicableCondition, showScoringConditionModal } from '$lib/store/general.store';
	import { Helper } from '$lib/utils/helper';
	import Icon from '@iconify/svelte';
	import type { PageServerData } from './$types';

	////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let sessionId = data.sessionId;
	let id = data.assessmentNode.id;
	let nodeType = data.assessmentNode.NodeType;
	let title = data.assessmentNode.Title;
	let description = data.assessmentNode.Description !== null && data.assessmentNode.Description !== "" ? data.assessmentNode.Description : "Not specified";
	let message = data.assessmentNode.Message !== null ? data.assessmentNode.Message : "Not specified" ;
	let serveListNodeChildrenAtOnce = data.assessmentNode.ServeListNodeChildrenAtOnce ?? null;
	let queryType = data.assessmentNode.QueryResponseType;
	let options = data.assessmentNode.Options ?? [];
	let childrenNodes = data.assessmentNode.Children ?? [];
	let displayCode = data.assessmentNode.DisplayCode;
	let resolutionScore;
	let sequence = data.assessmentNode.Sequence;

	console.log('nodeType', nodeType);

	$: resolutionScore;

	if (nodeType === 'Question') {
		resolutionScore = data.assessmentNode.ScoringCondition?.ResolutionScore;
	}

	scoringApplicableCondition.set(data.templateScoringCondition.ScoringApplicable);

	console.log('assessmentNode', data.assessmentNode);

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const nodeId = $page.params.nodeId;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;
	const editRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/edit`;
	const viewRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/view`;
	const assessmentNodeRoutes = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes`;
	const createNodeRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/create`;
	const assessmentTemplateView = `/users/${userId}/assessment-templates/${templateId}/view`;
	const editNodeRoute = (id) =>
		`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${id}/edit`;

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
			name: 'View',
			path: viewRoute
		}
	];
	const handleAssessmentNodeDelete = async (e, id) => {
		const assessmentNodeId = id;
		console.log('assessmentNodeId', assessmentNodeId);
		await Delete({
			sessionId: data.sessionId,
			assessmentTemplateId: templateId,
			assessmentNodeId: assessmentNodeId
		});
		window.location.href = viewRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/assessment-nodes`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
		console.log();
	}

	const onUpdateScoringCondition = async (resolutionScore: number) => {
		const scoringId = data.assessmentNode.ScoringCondition.id;
		console.log(scoringId);
		await updateScoringCondition({
			sessionId,
			templateId,
			nodeId,
			scoringConditionId: data.assessmentNode.ScoringCondition.id,
			resolutionScore: resolutionScore
		});
	};

	async function updateScoringCondition(model) {
		const response = await fetch(`/api/server/assessment-nodes/update-scoring-condition`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
		const resp = await response.text();
		const scoringCondition = JSON.parse(resp);
		resolutionScore = scoringCondition.ResolutionScore;
		console.log(response);
	}
</script>

<UpdateScoringCondition
	on:updateScoringCondition={async (e) => await onUpdateScoringCondition(e.detail.resolutionScore)}
/>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap justify-end gap-2">
	{#if nodeType === 'Node list'}
		<a href={createNodeRoute} class="btn variant-filled-secondary">Add child</a>
	{/if}
	<a href={editRoute} class="btn variant-filled-secondary">
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Assessment Node</th>
				<th class="text-end">
					<a href={assessmentNodeRoutes} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Node Type</td>
				<td>{nodeType}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Parent Node</td>
				<td>{displayCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Title</td>
				<td>{title}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Description</td>
				<td>{description}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Sequence</td>
				<td>{sequence}</td>
			</tr>
			{#if nodeType === 'Question'}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Query Response Type</td>
					<td>{queryType}</td>
				</tr>
				{#if options.length > 0}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td class="align-top">Options</td>
						<td>
							<ol class="list-decimal ml-3">
								{#each options as option}
									<li>{option.Text}</li>
								{/each}
							</ol>
						</td>
					</tr>
				{/if}

				{#if $scoringApplicableCondition === true}
					<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
						<td>Resolution Score</td>
						<td>
							<div class="flex items-center">
								<span>{resolutionScore}</span>

								<button
									on:click|preventDefault={async () => showScoringConditionModal.set(true)}
									class="btn p-2 -my-1 ml-auto hover:variant-soft-primary"
								>
									<Icon icon="material-symbols:edit-outline" class="text-lg" />
								</button>
							</div>
						</td>
					</tr>
				{/if}
			{:else if nodeType === 'Message'}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Message</td>
					<td>{message}</td>
				</tr>
			{:else if nodeType === 'Node list'}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Serve List Node Children At Once</td>
					<td>{serveListNodeChildrenAtOnce}</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td class="align-top">Children Nodes</td>
					<td>
						{#if childrenNodes.length <= 0}
							<span class="span">Children nodes not available!</span>
						{:else}
							<div
								class="table-container border border-secondary-100 dark:!border-surface-700"
								id="modules"
							>
								<table class="table table-compact">
									<thead class="!variant-soft-secondary">
										<tr>
											<th>Sequence</th>
											<th>Node type</th>
											<th>Title</th>
											<th />
											<th />
										</tr>
									</thead>
									<tbody class="!bg-white dark:!bg-inherit">
										{#each childrenNodes as node}
											<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
												<td>{node.Sequence}</td>
												<td>{node.NodeType}</td>
												<td>{Helper.truncateText(node.Title, 30)}</td>
												<td>
													<a
														href={editNodeRoute(node.id)}
														class="btn p-2 -my-1 hover:variant-soft-primary"
													>
														<Icon icon="material-symbols:edit-outline" class="text-lg" />
													</a>
												</td>
												<td>
													<Confirm
														confirmTitle="Delete"
														cancelTitle="Cancel"
														let:confirm={confirmThis}
														on:delete={(e) => handleAssessmentNodeDelete(e, node.id)}
													>
														<button
															on:click|preventDefault={() =>
																confirmThis(handleAssessmentNodeDelete, node.id)}
															class="btn p-2 -my-1 hover:variant-soft-error"
														>
															<Icon
																icon="material-symbols:delete-outline-rounded"
																class="text-lg"
															/>
														</button>
														<span slot="title"> Delete </span>
														<span slot="description">
															Are you sure you want to delete a child node?
														</span>
													</Confirm>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						{/if}
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>
