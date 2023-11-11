<script lang="ts">
	import CareplanLineChart from '$lib/components/users-stats/charts/careplan-line-chart.svelte';
	import UserEngagementChart from '$lib/components/users-stats/charts/user-engagement-chart.svelte';
	import type { PageServerData } from './dashboard/$types';
	export let data: PageServerData;

	let totalCareplans = data.careplanStats.CareplanStatistics.CareplansDaily;
	let assets = data.careplanStats.AssetsStatistics.AssetsDaily;
	let activeEnrollment = data.careplanStats.ActiveEnrollmentStatistics.ActiveEnrollmentsDaily;
	let participant = data.careplanStats.ParticipantStatistics.ParticipantsDaily;
	let totalEnrollment = data.careplanStats.EnrollmentStatistics.EnrollmentsDaily;
	let userEngagement = data.careplanStats.UserEngagementSattistics.UserEngagementDaily;
	console.log('statistics------------------>', data.careplanStats);
	let enrollmentCount = data.careplanStats.EnrollmentStatistics.TotalEnrollments;
	let activeEnrollmentCount = data.careplanStats.ActiveEnrollmentStatistics.TotalActiveEnrollments;
	let careplanCount = data.careplanStats.CareplanStatistics.TotalCareplans;
	let assetsCount = data.careplanStats.AssetsStatistics.TotalAssets;
	let participantsCount = data.careplanStats.ParticipantStatistics.TotalParticipants;
</script>

<dl class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 ">
	<div
		class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-96 sm:p-4"
	>
		<dt class="truncate text-xl font-medium text-center text-primary-500 dark:text-primary-100">
			Assets ({assetsCount})
		</dt>
		<dd class="h-96 w-full pb-6 ">
			<CareplanLineChart total={assets} />
		</dd>
	</div>
  <div
		class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-96 sm:p-4"
	>
		<dt class="truncate text-xl font-medium text-center text-primary-500 dark:text-primary-100">
			Careplans ({careplanCount})
		</dt>
		<dd class="h-96 w-full pb-6 ">
			<CareplanLineChart total={totalCareplans} />
		</dd>
	</div>
  <div
		class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-96 sm:p-4"
	>
		<dt class="truncate text-xl font-medium text-center text-primary-500 dark:text-primary-100">
			Participants ({participantsCount})
		</dt>
		<dd class="h-96 w-full pb-6 ">
			<CareplanLineChart total={participant} />
		</dd>
	</div>
  
  <div
  class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-96 sm:p-4"
>
  <dt class="truncate text-xl font-medium text-center text-primary-500 dark:text-primary-100">
    Total Enrollments ({enrollmentCount})
  </dt>
  <dd class="h-96 w-full pb-6 ">
    <CareplanLineChart total={totalEnrollment} />
  </dd>
</div>
<div
class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-96 sm:p-4"
>
<dt class="truncate text-xl font-medium text-center text-primary-500 dark:text-primary-100">
  Active Enrollments ({activeEnrollmentCount})
</dt>
<dd class="h-96 w-full pb-6 ">
  <CareplanLineChart total={activeEnrollment} />
</dd>
</div>
<div
class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-96 sm:p-4"
>
<dt class="truncate text-xl font-medium text-center text-primary-500 dark:text-primary-100">
  User Engagement
</dt>
<dd class="h-96 w-full pb-6 ">
  <UserEngagementChart total= {userEngagement}/>
</dd>
</div>
</dl>