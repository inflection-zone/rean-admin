<script lang="ts">
	import type { PageServerData } from './$types';
	import date from 'date-and-time';
	import { page } from '$app/stores';
	import EnrollmentDisplay from '$lib/components/enrollmentDisplay/enrollmentDisplay.svelte';
	import { goto } from '$app/navigation';
  import { ProgressRadial } from '@skeletonlabs/skeleton';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';

	////////////////////////////////////////////////////////////////////////

	const userId = $page.params.userId;
	const enrollmentId = $page.params.enrollmentId;
	const createRoute = `/users/${userId}/enrollments/create`;
	const editRoute = `/users/${userId}/careplan/enrollments/${enrollmentId}/edit`;
	const viewRoute = `/users/${userId}/careplan/enrollments/${enrollmentId}/view`;
	const viewTaskRoute = `/users/${userId}/careplan/enrollments/${enrollmentId}/tasks`;
	const enrollmentsRoute = `/users/${userId}/careplan/enrollments`;


	export let data: PageServerData;
	let value: number = 50; // %
	let enrollment = data.enrollment;
	let enrollmentStats = data.enrollmentStats;
	let participantBirthDate = enrollment.Participant.BirthDate;
	let participantDisplayId = enrollment.Participant.DisplayId;
	let enrollmentCode = enrollment.DisplayId;
	let currentWeek = enrollmentStats.CurrentWeek;
	let totalWeeks = enrollmentStats.TotalWeek;
	let weekArray = Array.from(new Array(totalWeeks), (x, i) => i + 1);
	let MAX_STEP_WIDTH = 500;
	//Calculating age by birthdate
	let year = Number(participantBirthDate.substr(0, 4));
	let month = Number(participantBirthDate.substr(4, 2)) - 1;
	let day = Number(participantBirthDate.substr(6, 2));
	let today = new Date();
	let age = today.getFullYear() - year;
	if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
		age--;
	}

	const breadCrumbs = [
		{
			name: 'Enrollments',
			path: enrollmentsRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<a href={viewTaskRoute} class="btn variant-filled-secondary ml-auto">Enrollment Tasks</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<div class="lg:flex w-full">
		<table class="table lg:w-1/2 w-full">
			<!-- <thead class="!variant-soft-secondary">
			<tr>
				<th>Enrollment View</th>
			</tr>
		</thead> -->
			<tbody class="!bg-white dark:!bg-inherit">
				<tr class="">
					<td>Enrollment Code</td>
					<td>{enrollmentCode}</td>
				</tr>
				<tr class="">
					<td>Participant</td>
					<td>Participant # {participantDisplayId}</td>
				</tr>
				<tr class="">
					<td>Age</td>
					<td>{age}</td>
				</tr>
				<tr class="">
					<td>Gender</td>
					<td>{enrollment.Participant.Gender}</td>
				</tr>
				<tr class="">
					<td>Careplan</td>
					<td>{enrollment.Careplan.Name}</td>
				</tr>
				<tr class="">
					<td>Category</td>
					<td>{enrollment.Careplan.Category.Type}</td>
				</tr>
				<tr class="">
					<td>Enrollment Date</td>
					<td>{date.format(new Date(enrollment.EnrollmentDate), 'DD-MMM-YYYY')}</td>
				</tr>
				<tr class="">
					<td>Start Date</td>
					<td>{date.format(new Date(enrollment.StartDate), 'DD-MMM-YYYY')}</td>
				</tr>
				<tr class="">
					<td>End Date</td>
					<td>{date.format(new Date(enrollment.EndDate), 'DD-MMM-YYYY')}</td>
				</tr>
				<tr class="">
					<td>Current Week</td>
					<td>{currentWeek}</td>
				</tr>
			</tbody>
		</table>
		<div class="lg:w-1/2 w-full pr-6">
			<EnrollmentDisplay {totalWeeks} {currentWeek} {MAX_STEP_WIDTH} />
		</div>
	</div>
  <div class="grid grid-cols md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-24 md:gap-28 pb-4 mt-4 ">
	<div class="flex justify-center">
		<div class="grid grid-cols justify-items-center">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="lable-text font-semibold text-xl mb-2">Total Tasks</label>
			<div
				class="radial-progress text-secondary text-xl font-bold"
				style="--value:100;--size:98px; --thickness:10px"
			>
				{enrollmentStats.TolalTask}
			</div>
		</div>
	</div>
	<div class="flex justify-center">
		<div class="grid grid-cols justify-items-center">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="lable-text font-semibold text-xl mb-2">Finished Tasks</label>
			<div
				class="radial-progress text-green-500 text-xl font-bold"
				style="--value:100;--size:98px; --thickness:10px"
			>
				{enrollmentStats.FinishedTask}
			</div>
      <!-- <ProgressRadial value={value}>{enrollmentStats.FinishedTask}</ProgressRadial> -->
		</div>
	</div>
	<div class="flex justify-center">
		<div class="grid grid-cols justify-items-center">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="lable-text font-semibold text-xl mb-2">Delayed Tasks</label>
			<div
				class="radial-progress text-red-500 text-xl font-bold"
				style="--value:100;--size:98px; --thickness:10px"
			>
				{enrollmentStats.DelayedTask}
			</div>
		</div>
	</div>
	<div class="flex justify-center">
		<div class="grid grid-cols justify-items-center">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label class="lable-text font-semibold text-xl mb-2 ">Unserved Tasks</label>
			<div
				class="radial-progress text-secondary text-xl font-bold"
				style="--value:100; --size:98px; --thickness:10px "
			>
				{enrollmentStats.UnservedTask}
			</div>
		</div>
	</div>
</div>
</div>

