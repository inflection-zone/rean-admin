<script lang="ts">
	import Fa from 'svelte-fa';
	import {
		faMessage,
		faMultiply,
		faPen,
		faQuestionCircle,
		faShareNodes
	} from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import { TreeView, TreeBranch, TreeLeaf } from 'svelte-tree-view-component';
	import type { PageServerData } from './$types';
	import { scoringApplicableCondition } from '$lib/store/general.store';

	export let data: PageServerData;
	let assessmentNodes = data.assessmentNodes;
	let id = data.assessmentTemplate.id;
	let title = data.assessmentTemplate.Title;
	let description = data.assessmentTemplate.Description;
	let displayCode = data.assessmentTemplate.DisplayCode;
	let type = data.assessmentTemplate.Type;
	let providerAssessmentCode = data.assessmentTemplate.ProviderAssessmentCode;
	let serveListNodeChildrenAtOnce = data.assessmentTemplate.ServeListNodeChildrenAtOnce;
	let scoringApplicable = data.assessmentTemplate.ScoringApplicable;
	let provider = data.assessmentTemplate.Provider;

	assessmentNodes = assessmentNodes.sort((a, b) => {
		return a.Sequence - b.Sequence;
	});

	console.log('assessmentNodes', assessmentNodes);

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
		scoringApplicableCondition.set(data.assessmentTemplate.ScoringApplicable);
		console.log('scoringApplicableCondition', $scoringApplicableCondition);
	});

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const editRoute = `/users/${userId}/assessment-templates/${templateId}/edit`;
	const viewRoute = `/users/${userId}/assessment-templates/${templateId}/view`;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;
	const nodeRoute = `/users/${userId}/assessment-templates/${templateId}/assessment-nodes/create`;
	const assessmentNodeView = (nodeId) =>
		`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/view`;

	const breadCrumbs = [
		{
			name: 'Assessments',
			path: assessmentsRoutes
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="pb-10">
		<form
			method="get"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white lg:text-xl text-lg ">
					<div class="lg:hidden md:hidden block">View Assessment Template</div>
					<div class="lg:block md:block hidden">View Assessment Template</div>
					<a href={assessmentsRoutes}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>

			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Title</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="title">{title}</span>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="description">{description}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Display code</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3 uppercase" id="displayCode">{displayCode}</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Type</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="type">{type}</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Provider</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="providerAssessmentCode">
					{provider}
				</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Provider assessment code</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="providerAssessmentCode">
					{providerAssessmentCode}
				</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Serve list node children at once</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="serveListNodeChildrenAtOnce">
					{serveListNodeChildrenAtOnce}
				</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Scoring Applicable</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="serveListNodeChildrenAtOnce">
					{scoringApplicable}
				</span>
			</div>

			<div class="flex items-start mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label mt-2">
						<span>Nodes</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3">
					<!-- svelte-ignore empty-block -->
					{#if assessmentNodes.length <= 1}
						<div>Nodes are not available</div>
					{:else}
						<TreeView lineColor="#5832A1" iconBackgroundColor="#5832A1" branchHoverColor="#5832A1">
							{#each assessmentNodes as node}
								{#if node.ParentNodeId === null}
									<TreeBranch rootContent={node.Title}>
										{#each node.Children as child}
											{#if child.NodeType === 'Node list' && child.ParentNodeId !== null}
												<TreeBranch defaultClosed>
													<div slot="root" class="flex">
														<Fa icon={faShareNodes} size="lg" class="mr-2" />
														<a href={assessmentNodeView(child.id)}>
															{child.Sequence}-{child.NodeType}-{child.Title}
														</a>
													</div>
													{#each child.Children as kid}
														{#if kid.NodeType === 'Node list' && kid.ParentNodeId !== null}
															<TreeBranch defaultClosed>
																<div slot="root" class="flex">
																	<Fa icon={faShareNodes} size="lg" class="mr-2" />
																	<a href={assessmentNodeView(kid.id)}>
																		{kid.Sequence}-{kid.NodeType}-{kid.Title}
																	</a>
																</div>
																{#each kid.Children as child}
																	{#if child.NodeType === 'Question'}
																		<TreeLeaf
																			><div class="flex">
																				<Fa icon={faQuestionCircle} size="lg" class="mr-2" />
																				<a href={assessmentNodeView(child.id)}>
																					{child.Sequence}-{child.NodeType}-{child.Title}
																				</a>
																			</div></TreeLeaf
																		>
																	{:else if child.NodeType === 'Message'}
																		<TreeLeaf
																			><div class="flex">
																				<Fa icon={faMessage} size="lg" class="mr-2" />
																				<a href={assessmentNodeView(child.id)}>
																					{child.Sequence}-{child.NodeType}-{child.Title}
																				</a>
																			</div></TreeLeaf
																		>
																	{/if}
																{/each}
															</TreeBranch>
														{:else if kid.NodeType === 'Question'}
															<TreeLeaf
																><div class="flex">
																	<Fa icon={faQuestionCircle} size="lg" class="mr-2" />
																	<a href={assessmentNodeView(kid.id)}>
																		{kid.Sequence}-{kid.NodeType}-{kid.Title}
																	</a>
																</div></TreeLeaf
															>
														{:else}
															<TreeLeaf
																><div class="flex">
																	<Fa icon={faMessage} size="lg" class="mr-2" />
																	<a href={assessmentNodeView(kid.id)}>
																		{kid.Sequence}-{kid.NodeType}-{kid.Title}
																	</a>
																</div></TreeLeaf
															>
														{/if}
													{/each}
												</TreeBranch>
											{:else if child.NodeType === 'Question'}
												<TreeLeaf
													><div class="flex">
														<Fa icon={faQuestionCircle} size="lg" class="mr-2" />
														<a href={assessmentNodeView(child.id)}>
															{child.Sequence}-{child.NodeType}-{child.Title}
														</a>
													</div></TreeLeaf
												>
											{:else if child.NodeType === 'Message'}
												<TreeLeaf
													><div class="flex">
														<Fa icon={faMessage} size="lg" class="mr-2" />
														<a href={assessmentNodeView(child.id)}>
															{child.Sequence}-{child.NodeType}-{child.Title}
														</a>
													</div></TreeLeaf
												>
											{/if}
										{/each}
									</TreeBranch>
								{/if}
							{/each}
						</TreeView>
					{/if}
				</span>
			</div>

			<div class="flex items-center mt-10 lg:mx-10 md:mx-16 sm:mr-10 min-[280px]:mr-72">
				<div class="lg:w-8/12 min-[280px]:w-1/3 sm:w-1/6 md:w-1/2" />
				<div class="flex lg:w-1/4 min-[280px]:w-1/6 sm:w-5/6 sm:mr-10 gap-3">
					<a href={nodeRoute}>
						<button
							type="submit"
							class="btn variant-filled-primary lg:w-full md:w-32 md:text-sm lg:text-md sm:text-xs sm:w-32 min-[280px]:w-32 min-[280px]:text-xs w-20 mb-8 h-10"
						>
							Assessment Nodes
						</button>
					</a>
					<a href={editRoute}>
						<button
							type="submit"
							class="btn variant-filled-primary lg:w-full md:w-28 sm:w-24 lg:text-md min-[280px]:w-24 w-20 mb-8 lg:mr-4 pr-2 h-10"
						>
							Edit
							<Fa icon={faPen} size="lg" class="lg:ml-4 sm:ml-2 ml-1" />
						</button>
					</a>
				</div>
			</div>
		</form>
	</div>
</main>
