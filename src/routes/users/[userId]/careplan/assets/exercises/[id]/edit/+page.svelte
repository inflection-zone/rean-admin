<script lang="ts">
	import type { PageServerData } from './$types';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import InputChip from '$lib/components/input-chips.svelte';
	import Icon from '@iconify/svelte';

	/////////////////////////////////////////////////////////////////////////////////////////////////

	const userId = $page.params.userId;
	const exerciseId = $page.params.id;
	const assetRoute = `/users/${userId}/careplan/assets`;
	const editRoute = `/users/${userId}/careplan/assets/exercises/${exerciseId}/edit`;
	const viewRoute = `/users/${userId}/careplan/assets/exercises/${exerciseId}/view`;
	const exerciseRoute = `/users/${userId}/careplan/assets/exercises/create`;

	export let form;
	export let data: PageServerData;
	let assetCode = data.exercise.AssetCode;
	let name = data.exercise.Name;
	let description = data.exercise.Description;
	let exerciseType = data.exercise.ExerciseType;
	let intensityLevel = data.exercise.IntensityLevel;
	let recommendedDurationMin = data.exercise.RecommendedDurationMin;
	let tags = data.exercise.Tags;
	let version = data.exercise.Version;

	//Original data
	let _name = name;
	let _description = description;
	let _tags = JSON.stringify(tags);
	let _exerciseType = exerciseType;
	let _intensityLevel = intensityLevel;
	let _recommendedDurationMin = recommendedDurationMin;
	let _version = version;

	function handleReset() {
		name = _name;
		description = _description;
		exerciseType = _exerciseType;
		intensityLevel = _intensityLevel;
		recommendedDurationMin = _recommendedDurationMin;
		tags = JSON.parse(_tags);
		version = _version;
	}

	const breadCrumbs = [
		{
			name: 'Assets',
			path: assetRoute
		},
		{
			name: 'Exercise',
			path: exerciseRoute
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
	action="?/updateExerciseAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Exercise</th>
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
				<td class="align-top">Exercise Type</td>
				<td>
					<select class="select" name="exerciseType" bind:value={exerciseType}>
						<option>Strength</option>
						<option>Aerobic</option>
						<option>Balance</option>
						<option>Reflexes</option>
						<option>Flexibility</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Intensity Level</td>
				<td>
					<select class="select" name="intensityLevel" bind:value={intensityLevel}>
						<option>None</option>
						<option>Minimal</option>
						<option>Moderate</option>
						<option>Somewhat hard</option>
						<option>Hard</option>
						<option>Harder</option>
						<option>Very hard</option>
						<option>Extremely hard</option>
						<option>Maximum effort</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Recommended Duration Min</td>
				<td>
					<input
						type="number"
						class="input"
						placeholder="Enter recommendedDurationMin here..."
						bind:value={recommendedDurationMin}
						name="recommendedDurationMin"
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
