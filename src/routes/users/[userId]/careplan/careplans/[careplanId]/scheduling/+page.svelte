<script lang="ts">
	import Careplanscheduleform from './careplan-schedule-form.svelte';
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Select from 'svelte-select';
	import type { PageServerData } from './$types';
	import Icon from '@iconify/svelte';

	//////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	const assetType = data.assetTypes;
	let careplanActivities = data.careplanActivities;
	let items = [];
	let types = assetType.Data.AssetTypes;
	const timeSlot = data.timeslot;
	const carePlan = data.careplan;
	const carePlanData = carePlan.Data;
	const carePlanCode = carePlanData.Code;
	const carePlanName = carePlanData.Name;
	const carePlanType = carePlan.Data.Type;

	let show = false;
	let hide = true;
	function hideForm() {
		show = false;
	}
	const userId = $page.params.userId;
	const careplanId = $page.params.careplanId;
	const careplansRoute = `/users/${userId}/careplan/careplans`;
	const schedulingRoute = `/users/${userId}/careplan/careplans/${careplanId}/scheduling`;
	const breadCrumbs = [
		{
			name: 'Careplan',
			path: careplansRoute
		},
		{
			name: 'Scheduling',
			path: schedulingRoute
		}
	];

	const sanitizeActivities = (activities) => {
		var sanitized = [];
		for (var a of activities) {
			if (a.Day == null) {
				a.Day = 1;
			}
			sanitized.push(a);
		}
		return sanitized;
	};

	const classifyActivitiesByDay = (careplanActivities) => {
		try {
			var daysAvailable = careplanActivities.map((x) => x.Day);
			var daysSet = new Set(daysAvailable);
			var sortedDayKeys = [...daysSet];
			var classifiedActivities = [];
			for (var d of sortedDayKeys) {
				var activitiesForDay = careplanActivities.filter((x) => x.Day === d);
				classifiedActivities.push({
					Day: d,
					Activities: activitiesForDay
				});
			}
			return classifiedActivities;
		} catch (err) {
			console.log(err.message);
		}
	};

	//Classify activities by week
	const classifyByWeek = (classifiedByDay) => {
		try {
			var classified = [];
			for (var c of classifiedByDay) {
				var week = Math.ceil(c.Day / 7);
				const existingWeek = classified.find((x) => x.Week == week);
				if (existingWeek != undefined) {
					existingWeek.Days.push(c);
				} else {
					var newWeek = {
						Week: week,
						Days: [c]
					};
					classified.push(newWeek);
				}
			}
			return classified;
		} catch (err) {
			console.log(err.message);
		}
	};

	var sanitized = sanitizeActivities(careplanActivities);
	var classifiedByDay = classifyActivitiesByDay(sanitized);

	var classifiedByWeek = classifyByWeek(classifiedByDay);

	const assetRouteMap = {
		'Action plan': 'action-plans',
		Animation: 'animations',
		Appointment: 'appointments',
		Article: 'articles',
		Assessment: 'assessments',
		Audio: 'audio',
		Biometrics: 'biometrics',
		Challenge: 'challenges',
		Checkup: 'checkups',
		Consultation: 'consultations',
		Exercise: 'exercises',
		Goal: 'goals',
		Infographics: 'infographics',
		Medication: 'medications',
		Meditation: 'meditations',
		Message: 'messages',
		Nutrition: 'nutritions',
		Physiotherapy: 'physiotherapy',
		Priority: 'priorities',
		Reflection: 'reflections',
		Reminder: 'reminders',
		Video: 'video',
		'Web link': 'web-links',
		'Web newsfeed': 'web-newsfeeds',
		'Word power': 'word-power'
	};

	let selectedAssetType = 'Action plan';
	const onSelectAssetType = async (e) => {
		selectedAssetType = e.currentTarget.value;
		await searchAssets({
			sessionId: data.sessionId,
			selectedAssetType
		});
	};

	async function searchAssets(model) {
		const selectedAssetRoute = assetRouteMap[selectedAssetType];
		let url = `/api/server/careplan/assets/search?assetType=${selectedAssetRoute}`;
		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});
		const response = await res.json();
		items = response.map((obj) => {
			return { value: obj.id, label: obj.Name };
		});
		console.log('response: ', response);
		console.log('items: ', items);
		return items;
	}

	const handleSchedulingDelete = async (e) => {
		let careplanActivityId = e;
		await Delete({
			sessionId: data.sessionId,
			careplanActivityId
		});
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/careplan/careplan-activity`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
		console.log('response', response);
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex-col items-center mt-2 ">
	<div class="flex mx-2 gap-6">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="lable-text font-semibold">Careplan</label>
		<span class="">{carePlanName}</span>
	</div>
	<div class="flex mx-2 gap-14">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="lable-text font-semibold">Code </label>
		<span class="">{carePlanCode}</span>
	</div>
	<div class="flex mx-2 gap-6">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="lable-text font-semibold">Category</label>
		<span class="">{carePlanType}</span>
	</div>
</div>

{#if show}
	<form
		method="post"
		action="?/createCarePlanActivityAction"
		class="table-container border border-secondary-100 dark:!border-surface-700 mt-2 mb-6"
	>
		<table class="table">
			<thead class="!variant-soft-secondary">
				<tr>
					<th>Schedule New Activity</th>
					<th class="text-end">
						<button class="btn p-2 -my-2 variant-soft-secondary" on:click={hideForm}>
							<Icon icon="material-symbols:close-rounded" class="text-lg" />
						</button>
					</th>
				</tr>
			</thead>
			<tbody class="!bg-white dark:!bg-inherit">
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Assets Type *</td>
					<td>
						<select name="assetType" class="select" on:change={onSelectAssetType}>
							{#each types as val}
								<option value={val}>
									{val}
								</option>
							{/each}
						</select>
					</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Asset*</td>
					<td>
						<select name="assetId" class="select">
							{#each items as val}
								<option value={val.value}>
									{val.label}
								</option>
							{/each}
						</select>
					</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Scheduled Day*</td>
					<td>
						<input
							type="number"
							name="day"
							required
							placeholder="Enter scheduled day here..."
							class="input "
							min="1"
							step="1"
						/>
					</td>
				</tr>
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Slot of the Day*</td>
					<td>
						<select name="timeSlot" class="select">
							{#each timeSlot as val}
								<option value={val}>
									{val}
								</option>
							{/each}
						</select>
					</td>
				</tr>
			</tbody>
		</table>
		<div class="flex p-2 justify-end">
			<button type="submit" class="btn variant-filled-secondary">Submit</button>
		</div>
	</form>
{:else if hide}
	<div class="flex flex-wrap gap-2">
		<button
			on:click|preventDefault={() => (show = !show)}
			class="btn variant-filled-secondary ml-auto"
		>
			Schedule New Activity
		</button>
	</div>
{/if}
<Careplanscheduleform
	{classifiedByDay}
	{classifiedByWeek}
	{userId}
	{careplanId}
	on:deleteActivity={async (e) => {
		await handleSchedulingDelete(e.detail.careplanActivityId);
	}}
/>
