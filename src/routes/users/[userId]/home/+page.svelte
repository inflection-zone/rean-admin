<script lang="ts">
	import type { PageServerData } from './$types';
	import PlatformBasedChart from '$lib/components/users-stats/charts/platform-based-chart.svelte';
	import Funnel from '$lib/components/users-stats/charts/funnel.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let overallUsersData = data.overallUsersData;
	let totalUsers = overallUsersData.TotalUsers;
	let activeUsers = overallUsersData.UsersWithActiveSession;
	let deletedUsers = overallUsersData.DeletedUsers;
	let nonDeletedUsers = overallUsersData.NotDeletedUsers;
	let deviceDetailWiseUsersData = data.deviceDetailWiseUsers;
	// let missingDeviceDetails = data.deviceDetailWiseUsers.MissingDeviceDetails;
	let yearsArray = [];
	let totalUsersData = [];
	let androidUsersData = [];
	let iOSUsersData = [];
	let yearWiseUserData = data.yearWiseUserCount
	let yearWiseDeviceDetails = data.yearWiseDeviceDetails;
	extractYearWiseUserCount(yearWiseUserData);
	extractYearWiseDeviceDetails(yearWiseDeviceDetails);

	let enrolledUsersData = overallUsersData.EnrolledUsers;
	let downloads = data.appDownloadCount;

	let labels = [
		// 'Downloads',
		'Onboarded',
		'Not-Deleted ',
		'Enrolled Users',
		// 'Users With Active Session',
	];

	let funnelChartData;
	$: funnelChartData = [
		// downloads,
		totalUsers.Count,
		nonDeletedUsers.Count,
		enrolledUsersData.Count,
		// activeUsers.Count,
	];

	function extractYearWiseUserCount(data:any[]){
		data.forEach((value)=>{
			yearsArray.push(value.Year);
			totalUsersData.push(value.UserCount);
		})
	}

	function extractYearWiseDeviceDetails(data:any[]){
		data.forEach(value=>{
			if (value.DeviceDetails.length===0){
				androidUsersData.push(0);
				iOSUsersData.push(0);
			}else{
				let andriodCount=undefined;
				let iOSCount=undefined;
				value.DeviceDetails.forEach(devicedetails=>{
					if(devicedetails.OSType==='Android'){
						andriodCount = devicedetails.count;
						// androidUsersData.push(devicedetails.count);
					}
					if(devicedetails.OSType==='iOS'){
						iOSCount = devicedetails.count;
						// iOSUsersData.push(devicedetails.count);
					}
				})
				if (!andriodCount){
					androidUsersData.push(0);
				}else{
					androidUsersData.push(andriodCount);
				}
				if (!iOSCount){
					iOSUsersData.push(0);
				}else{
					iOSUsersData.push(iOSCount);
				}
			}

		})
	}
</script>

<dl class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
	<div
		class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-28 sm:p-4"
	>
		<dt class="truncate text-md font-normal text-primary-500 dark:text-primary-100">
			App Downloads
		</dt>
		<dd class="mt-2 text-5xl font-semibold tracking-tight text-primary-500 dark:text-primary-100">
			{downloads}
		</dd>
	</div>
	<div
		class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-28 sm:p-4"
	>
		<dt class="truncate text-md font-normal text-primary-500 dark:text-primary-100">Onboarded Users</dt>
		<dd class="mt-1 text-5xl font-semibold tracking-tight text-primary-500 dark:text-primary-100">
			{totalUsers.Count}
		</dd>
	</div>
	<div
		class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-28 sm:p-4"
	>
		<dt class="truncate text-md font-normal text-primary-500 dark:text-primary-100">Not Deleted Users</dt>
		<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
			<div class="text-5xl  font-semibold text-primary-500 dark:text-primary-100">{nonDeletedUsers.Count}</div>
			<div class="ml-2 flex items-baseline text-md font-normal text-primary-500 dark:text-primary-100">
				{nonDeletedUsers.Ratio}
				<div class="text-xs">%</div>
			</div>
		</dd>
	</div>
	<div
		class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-28 sm:p-4"
	>
		<dt class="truncate text-md font-normal text-primary-500 dark:text-primary-100">Users With Active Session</dt>
		<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
			<div class="text-5xl  font-semibold text-primary-500 dark:text-primary-100">{activeUsers.Count}</div>
			<div class="ml-2 flex items-baseline text-md font-normal text-primary-500 dark:text-primary-100">
				{activeUsers.Ratio}
				<div class="text-xs">%</div>
			</div>
		</dd>
	</div>
	<div
		class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-28 sm:p-4"
	>
		<dt class="truncate text-md font-normal text-primary-500 dark:text-primary-100">Deleted Users</dt>
		<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
			<div class="text-5xl  font-semibold text-primary-500 dark:text-primary-100">{deletedUsers.Count}</div>
			<div class="ml-2 flex items-baseline text-md font-normal text-primary-500 dark:text-primary-100">
				{deletedUsers.Ratio}
				<div class="text-xs">%</div>
			</div>
		</dd>
	</div>

	<div
		class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-28 sm:p-4"
	>
		<dt class="truncate text-md font-normal text-primary-500 dark:text-primary-100">Enrolled Users</dt>
		<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
			<div class="text-5xl  font-semibold text-primary-500 dark:text-primary-100">{enrolledUsersData.Count}</div>
			<div class="ml-2 flex items-baseline text-md font-normal text-primary-500 dark:text-primary-100">
				{enrolledUsersData.Ratio}
				<div class="text-xs">%</div>
			</div>
		</dd>
	</div>

	{#each deviceDetailWiseUsersData as data }
		<div class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-28 sm:p-4">
			<dt class="truncate text-md font-normal text-primary-500 dark:text-primary-100">{data.OSType}</dt>
			<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
				<div class="text-5xl  font-semibold text-primary-500 dark:text-primary-100">{data.count}</div>
					<!-- <div class="ml-2 flex items-baseline text-md font-normal text-primary-500 dark:text-primary-100">
				{((data.count / downloads) * 100).toFixed(2)}
					<div class="text-xs">%</div>
				</div> -->
			</dd>
		</div>
		{/each}

	<!-- <div
		class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-28 sm:p-4"
	>
		<dt class="truncate text-md font-normal text-primary-500 dark:text-primary-100">Android Users</dt>
		<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
			<div class="text-5xl  font-semibold text-primary-500 dark:text-primary-100">{androidUsers.Count}</div>
			<div class="ml-2 flex items-baseline text-md font-normal text-primary-500 dark:text-primary-100">
				{androidUsers.Ratio}
				<div class="text-xs">%</div>
			</div>
		</dd>
	</div>
	<div
		class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-28 sm:p-4"
	>
		<dt class="truncate text-md font-normal text-primary-500 dark:text-primary-100">IOS Users</dt>
		<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
			<div class="text-5xl  font-semibold text-primary-500 dark:text-primary-100">{iOSUsers.Count}</div>
			<div class="ml-2 flex items-baseline text-md font-normal text-primary-500 dark:text-primary-100">
				{iOSUsers.Ratio}
				<div class="text-xs">%</div>
			</div>
		</dd>
	</div>
	<div
		class="overflow-hidden rounded-lg px-4 shadow-xl border border-secondary-100 dark:border-surface-700 h-28 sm:p-4"
	>
		<dt class="truncate text-md font-normal text-primary-500 dark:text-primary-100">Missing Device Details</dt>
		<dd class="mt-1 flex items-baseline pb-6 sm:pb-7">
			<div class="text-5xl  font-semibold text-primary-500 dark:text-primary-100">{missingDeviceDetails.Count}</div>
			<div class="ml-2 flex items-baseline text-md font-normal text-primary-500 dark:text-primary-100">
				{missingDeviceDetails.Ratio}
				<div class="text-xs">%</div>
			</div>
		</dd>
	</div> -->
</dl>

<div class="flex h-80 gap-10 w-full mt-5">
	<div
		class="mt-5 flex overflow-x-auto rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:p-6 w-1/2 h-auto"
	>
		<div class="pb-4 w-1/2 gap-6 justify-center ">
			<h4 class="text-center mb-2 p-2 font-semibold justify-center text-primary-500 dark:text-primary-100">App Users</h4>
			<div>
				<Funnel {labels} dataSource={funnelChartData} />
			</div>
		</div>
		<div class="mt-10 px-4 w-1/2">
			<!-- <div class="flex  items-center gap-4 ">
				<div class="h-3 w-3 mt-1 border bg-primary-700" />
				<div class="text-sm font-normal text-primary-500 dark:text-primary-100">Downloads</div>
				<div class="text-sm font-normal text-primary-500 dark:text-primary-100">{downloads}</div>
			</div> -->
			<div class="flex gap-4 w-full py-1">
				<div class="h-3 w-3 mt-1 border bg-primary-700" />
				<div class="text-sm w-2/3 font-normal text-primary-500 dark:text-primary-100">Onboarded Users</div>
				<div class="text-sm w-1/3 font-normal text-primary-500 dark:text-primary-100">{totalUsers.Count}</div>
			</div>
			<div class="flex gap-4 w-full py-1">
				<div class="h-3 w-3 mt-1 border bg-primary-500" />
				<div class="text-sm w-2/3 font-normal text-primary-500 dark:text-primary-100">Not Deleted Users</div>
				<div class="text-sm w-1/3 font-normal text-primary-500 dark:text-primary-100">{nonDeletedUsers.Count}</div>
			</div>
			<div class="flex gap-4 py-1 w-full">
				<div class="h-3 w-3 mt-1 border bg-secondary-500" />
				<div class="text-sm w-2/3 font-normal text-primary-500 dark:text-primary-100">Enrolled Users</div>
				<div class="text-sm w-1/3 font-normal text-primary-500 dark:text-primary-100">{enrolledUsersData.Count}</div>
			</div>
			<div class="flex gap-4 w-full py-1">
				<div class="h-3 w-3 mt-1 border bg-secondary-200" />
				<div class="text-sm w-2/3 font-normal text-primary-500 dark:text-primary-100">Users With Active Session</div>
				<div class="text-sm w-1/3 font-normal text-primary-500 dark:text-primary-100">{activeUsers.Count}</div>
			</div>
		</div>
	</div>
	<div
		class="mt-5 flex overflow-x-auto rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:p-6 w-1/2 h-auto"
	>
		<div class="pb-8 w-full">
			<h4 class="text-center mb-2 p-2 font-semibold justify-center text-primary-500 dark:text-primary-100">
				Platform Based Users
			</h4>
			<div class="w-full h-full">
				<PlatformBasedChart {totalUsersData} {androidUsersData} {iOSUsersData} lables={yearsArray} />
			</div>
		</div>
	</div>
</div>