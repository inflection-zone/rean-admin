<script lang="ts">
	import CollapsibleSection from './collapsibleSection.svelte';
	import { createEventDispatcher } from 'svelte';
	export let userId = undefined;
	export let careplanId = undefined;
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import Icon from '@iconify/svelte';

	////////////////////////////////////////////////////////////////////////

	export let classifiedByWeek = [];
	const dispatch = createEventDispatcher();
	const handlelDeleteClick = async (id) => {
		dispatch('deleteActivity', {
			careplanActivityId: id
		});
	};
</script>

<section class="bg-white dark:bg-inherit overflow-auto">
	{#each classifiedByWeek as week, i}
		<CollapsibleSection headerText={`Week ${i + 1}`}>
			<div>
				{#each week.Days as day, i}
					<CollapsibleSection headerText={`Day ${i + 1}`}>
						<div class="table-container border !border-secondary-100 dark:!border-surface-700">
							<table class="table table-compact">
								<thead class="!variant-soft-secondary">
									<tr>
										<th>Id</th>
										<th>AssetType</th>
										<th>Code</th>
										<th>Time Slot</th>
										<th />
										<th />
									</tr>
								</thead>
								<tbody class="!bg-white dark:!bg-inherit">
									{#each day.Activities as activity, i}
										<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
											<td role="gridcell" aria-colindex={1} tabindex="0">
												{i + 1}
											</td>
											<td>
												{activity.AssetType}
											</td>
											<td>{activity.Code}</td>
											<td>{activity.TimeSlot}</td>
											<td>
												<a
													href={`/users/${userId}/careplan/careplans/${careplanId}/scheduling/${activity.id}/edit`}
													class="btn p-2 -my-1 hover:variant-soft-primary"
												>
													<Icon icon="material-symbols:edit-outline" class="lg" />
												</a>
											</td>
											<td>
												<Confirm
													confirmTitle="Delete"
													cancelTitle="Cancel"
													let:confirm={confirmThis}
													on:delete={() => handlelDeleteClick(activity.id)}
												>
													<button
														on:click|preventDefault={() =>
															confirmThis(handlelDeleteClick, activity.id)}
														class="btn p-2 -my-1 hover:variant-soft-error"
													>
														<Icon icon="material-symbols:delete-outline-rounded" class="text-lg" />
													</button>
													<span slot="title"> Delete </span>
													<span slot="description">
														Are you sure you want to delete a careplan activity?
													</span>
												</Confirm>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</CollapsibleSection>
				{/each}
			</div>
		</CollapsibleSection>
	{/each}
</section>
