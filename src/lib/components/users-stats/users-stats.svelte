<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import PieChart from './charts/pie-chart.svelte';
	import BarChart from './charts/bar-chart.svelte';
	import HorizontalBarChart from './charts/horizontal-bar-chart.svelte';
	import HealthPillarChart from './charts/health-pillar-chart.svelte';
	import BiometricsChart from './charts/biometrics-chart.svelte';
	import { tick } from 'svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let years;
	export let genderWiseUsers;
	export let ageWiseUsers;
	export let maritalStatusWiseUsers;
	export let countryWiseUsers;
	export let majorAilment;
	// export let obesityDistribution;
	export let addictionDistribution;
	// export let healthPillarDistribution;
	// export let healthPillarDistributionMonthly;
	// export let roleDistribution;
	// export let biometricsDistribution;
	// export let biometricsDistributionMonthly;
	export let usersCount;
	export let deviceDetailWiseUsers;

	console.log("years",years)
	// let androidUsers = deviceDetailWiseUsers.AndroidUsers;
	// let iOSUsers = deviceDetailWiseUsers.IOSUsers;
	// let missingDeviceDetails = deviceDetailWiseUsers.MissingDeviceDetails;

	const usersData = [
		{
			usersDetail: 'Not Deleted Users',
			count: usersCount.NotDeletedUsers.Count,
			ratio: `${Math.ceil(usersCount.NotDeletedUsers.Ratio)}`
		},
		{
			usersDetail: 'Users With Active Session',
			count: usersCount.UsersWithActiveSession.Count,
			ratio: `${Math.ceil(usersCount.UsersWithActiveSession.Ratio)}`
		},
		{
			usersDetail: 'Deleted Users',
			count: usersCount.DeletedUsers.Count,
			ratio: `${Math.ceil(usersCount.DeletedUsers.Ratio)}`
		},
		{
			usersDetail: 'Enrolled Users',
			count: usersCount.EnrolledUsers.Count,
			ratio: `${Math.ceil(usersCount.EnrolledUsers.Ratio)}`
		}
	];

	// const deviceDetailData = [
	// 	{
	// 		usersDetail: 'Android Users',
	// 		count: androidUsers.Count,
	// 		ratio: `${Math.ceil(androidUsers.Ratio)}`
	// 	},
	// 	{
	// 		usersDetail: 'IOS Users',
	// 		count: iOSUsers.Count,
	// 		ratio: `${Math.ceil(iOSUsers.Ratio)}`
	// 	},
	// 	{
	// 		usersDetail: 'Missing Device Detail Users',
	// 		count: missingDeviceDetails.Count,
	// 		ratio: `${Math.ceil(missingDeviceDetails.Ratio)}`
	// 	}
	// ];

	let genderDistributionLabels;
	let genderDistributionData;

	$: if (genderWiseUsers) {
		genderDistributionLabels = false;
		genderDistributionData = false;

		tick().then(() => {
			genderDistributionLabels = genderWiseUsers.map((x) => x.Status);
			genderDistributionData = genderWiseUsers.map((x) => x.Ratio);
		});
	}

	let ageDistributionLabels;
	let ageDistributionData;

	$: if (ageWiseUsers) {
		ageDistributionLabels = false;
		ageDistributionData = false;

		tick().then(() => {
			ageDistributionLabels = ageWiseUsers.map((x) => x.Status);
			ageDistributionData = ageWiseUsers.map((x) => x.Ratio);
		});
	}

	let maritalStatusDistributionLabels;
	let maritalStatusDistributionData;

	$: if (maritalStatusWiseUsers) {
		maritalStatusDistributionLabels = false;
		maritalStatusDistributionData = false;

		tick().then(() => {
      maritalStatusDistributionLabels = maritalStatusWiseUsers.map((x) => x.MaritalStatus);
	    maritalStatusDistributionData = maritalStatusWiseUsers.map((x) => x.count);
		});
	}

	let cuntryDistributionLabels;
	let cuntryDistributionData;

	$: if (countryWiseUsers) {
		cuntryDistributionLabels = false;
		cuntryDistributionData = false;

		tick().then(() => {
		cuntryDistributionLabels = countryWiseUsers.map((x) => x.Country);
		cuntryDistributionData = countryWiseUsers.map((x) => x.Ratio);
		});
	}

	let majorAilmentDistributionData;
	let majorAilmentDistributionLabels;

	$: if (majorAilment) {
		majorAilmentDistributionData = false;
		majorAilmentDistributionLabels = false;

		tick().then(() => {
			majorAilmentDistributionData = majorAilment.map((x) => x.count);
			majorAilmentDistributionLabels = majorAilment.map((x) => x.MajorAilment);
		});
	}

	let obesityDistributionData;
	let obesityDistributionLabels;

	// $: if (obesityDistribution) {
	// 	obesityDistributionData = false;
	// 	obesityDistributionLabels = false;

	// 	tick().then(() => {
	// 		obesityDistributionData = obesityDistribution.map((x) => x.Count);
	// 		obesityDistributionLabels = obesityDistribution.map((x) => x.Status);
	// 	});
	// }

	let addictionDistributionData;
	let addictionDistributionLabels;

	$: if (addictionDistribution) {
		addictionDistributionData = false;
		addictionDistributionLabels = false;

		tick().then(() => {
			addictionDistributionData  = addictionDistribution.map((x) => x.Count);
			addictionDistributionLabels = addictionDistribution.map((x) => x.Status);
		});
	}

	// let healthPillarDistributionData = healthPillarDistribution.map((x) => x.Count);
	// let healthPillarDistributionLabels = healthPillarDistribution.map((x) => x.Status);

	// let roleDistributionData = roleDistribution.map((x) => x.Ratio);
	// let roleDistributionLabels = roleDistribution.map((x) => x.Role);

	// let biometricsDistributionData = biometricsDistribution.map((x) => x.Count);
	// let biometricsDistributionLabels = biometricsDistribution.map((x) => x.Biometrics);

	const dispatch = createEventDispatcher();

	const handlelSelectYearForAge = (year) => {
		dispatch('selectAgeWiseUsersDividionYearly', {
			year: year
		});
	};

	const handlelSelectYearForGender = (year) => {
		dispatch('selectGenderWiseUsersDividionYearly', {
			year: year
		});
	};

	const handlelSelectYearForCountry = (year) => {
		dispatch('selectCountryDistributionYearly', {
			year: year
		});
	};

	const handlelSelectYearForMaritalStatus = (year) => {
		dispatch('selectMaritalStatusDistributionYearly', {
			year: year
		});
	};

	const handlelSelectYearForMajorAilments = (year) => {
		dispatch('selectMajorAilmentDistributionYearly', {
			year: year
		});
	};

	const handlelSelectYearForObesity = (year) => {
		dispatch('selectObesityDistributionYearly', {
			year: year
		});
	};

	const handlelSelectYearForAddiction = (year) => {
		dispatch('selectAddictionDistributionYearly', {
			year: year
		});
	};
	
</script>

<!-- <BreadCrumbs crumbs={breadCrumbs} /> -->

<div class="flex flex-col justify-center ">
	<div class="grid grid-cols-1 justify-center rounded-lg py-8 gap-8 ">
		<div
			class="grid grid-cols-1 overflow-x-auto justify-center rounded-lg  shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 px-4 py-4 w-full h-full"
		>
			<div class="px-4 sm:px-6 lg:px-8">
				<div class="flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table class="min-w-full">
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3 pl-4 pr-3 text-left text-lg font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
										>
											Users
										</th>
										<th
											scope="col"
											class="px-3 py-3 text-left text-lg font-semibold text-primary-500 dark:text-primary-100"
										>
											Count
										</th>
										<th
											scope="col"
											class="px-3 py-3 text-left text-lg font-semibold text-primary-500 dark:text-primary-100"
										>
											Percentage
										</th>
									</tr>
								</thead>
								<tbody>
									<tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
										<td
											style="width:10%;"
											class="whitespace-nowrap text-sm py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 sm:pl-3"
											>Total Users</td
										>
										<td
											style="width:10%;"
											class="whitespace-nowrap px-3 py-2 text-sm  text-primary-500 dark:text-primary-100"
											>{usersCount.TotalUsers.Count}</td
										>
										<td
											style="width:15%;"
											class="whitespace-nowrap px-3 py-2 text-sm  text-primary-500 dark:text-primary-100"
											>-
										</td>
									</tr>
									{#each usersData as data}
										<tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
											<td
												style="width:10%;"
												class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm  sm:pl-3"
												>{data.usersDetail}</td
											>
											<td
												style="width:10%;"
												class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
											>
												{data.count}
											</td>
											<td
												style="width:15%;"
												class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
											>
												<div class="flex items-center">
													<div class="h-2 w-1/4 rounded-full bg-primary-200 mr-2">
														<div
															class="h-2 rounded-full bg-primary-500"
															style="width:{data.ratio}%"
														/>
													</div>
													<span class="text-primary-500 dark:text-primary-100 ">{data.ratio}</span>
													<span class="text-primary-500 dark:text-primary-100 text-xs">%</span>
												</div>
											</td>
										</tr>
									{/each}
									{#each deviceDetailWiseUsers as data}
										<tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
											<td
												style="width:10%;"
												class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm  sm:pl-3"
												>{data.OSType}</td
											>
											<td
												style="width:10%;"
												class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
												>{data.count}</td
											>
											<td
												style="width:15%;"
												class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
											>
												<div class="flex items-center">
													<div class="h-2 w-1/4 rounded-full bg-primary-200 mr-2">
														<div
															class="h-2 rounded-full bg-primary-500"
															style="width:{Math.ceil((data.count / usersCount.TotalUsers.Count) * 100).toFixed(2)}%"
														/>
													</div>
													<span class="text-primary-500 dark:text-primary-100 ">{Math.ceil((data.count / usersCount.TotalUsers.Count) * 100).toFixed(0)}</span>
													<span class="text-primary-500 dark:text-primary-100 text-xs">%</span>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div
			class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3"
		>
			<div class="px-4 sm:px-6 lg:px-8 col-span-2">
				<div class="flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table class="min-w-full">
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3 pl-4 pr-3 text-left text-lg font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
											>Age</th
										>
									</tr>
								</thead>
								<tbody>
									{#each ageWiseUsers as data}
										<tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
											<td
												style="width:10%;"
												class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm  sm:pl-3"
												>{data.Status}</td
											>
											<td
												style="width:10%;"
												class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
												>{data.Count}</td
											>
											<td
												style="width:15%;"
												class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
											>
												<div class="flex items-center">
													<div class="h-2 w-1/4 rounded-full bg-primary-200 mr-2">
														<div
															class="h-2 rounded-full bg-primary-500"
															style="width:{data.Ratio}%"
														/>
													</div>
													<span class="text-primary-500 dark:text-primary-100 ">{data.Ratio}</span>
													<span class="text-primary-500 dark:text-primary-100 text-xs">%</span>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div>
				<select name="year" id="" class="select w-2/3 mt-3" on:change={handlelSelectYearForAge}>
					<option selected disabled>All the years</option>
					{#each years as year }
					<option value= {year.year}>{year.year}</option>
					{/each}
				</select>
				<div class="w-64 h-64">
					{#if ageDistributionData}
						<PieChart labels={ageDistributionLabels} data={ageDistributionData} title="Age" />
					{/if}
				</div>
			</div>
		</div>
		<div
			class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg  shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3 "
		>
			<div class="px-4 sm:px-6 lg:px-8 col-span-2">
				<div class="flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table class="min-w-full">
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3 pl-4 pr-3 text-left text-lg font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
											>Gender</th
										>
									</tr>
								</thead>
								<tbody>
									{#each genderWiseUsers as data}
										<tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
											<td
												style="width:10%;"
												class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm  sm:pl-3"
												>{data.Status}</td
											>
											<td
												style="width:10%;"
												class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
												>{data.Count}</td
											>
											<td
												style="width:15%;"
												class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
											>
												<div class="flex items-center">
													<div class="h-2 w-1/4 rounded-full bg-primary-200 mr-2">
														<div
															class="h-2 rounded-full bg-primary-500"
															style="width:{data.Ratio}%"
														/>
													</div>
													<span class="text-primary-500 dark:text-primary-100 ">{data.Ratio}</span>
													<span class="text-primary-500 dark:text-primary-100 text-xs">%</span>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div>
				<select name="year" id="" class="select w-2/3 mt-3" on:change={handlelSelectYearForGender}>
					<option selected disabled>All the years</option>
					{#each years as year }
					<option value= {year.year}>{year.year}</option>
					{/each}
				</select>
				<div class="w-64 h-64 pt-0">
					{#if genderDistributionData}
						<PieChart
							labels={genderDistributionLabels}
							data={genderDistributionData}
							title="Gender"
						/>
					{/if}
				</div>
			</div>
		</div>

		<div
			class="grid grid-cols-3 overflow-x-auto justify-center rounded-lg  shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-full h-full gap-3 "
		>
			<div class="px-4 sm:px-6 lg:px-8 col-span-2">
				<div class="flow-root">
					<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table class="min-w-full">
								<thead>
									<tr>
										<th
											scope="col"
											class="py-3 pl-4 pr-3 text-left text-lg font-semibold text-primary-500 dark:text-primary-100 sm:pl-3"
											>Country</th
										>
									</tr>
								</thead>
								<tbody>
									{#each countryWiseUsers as data}
										<tr class="hover:bg-secondary-50 dark:hover:bg-surface-800 transition">
											<td
												style="width:10%;"
												class="whitespace-nowrap py-2 pl-4 pr-3 text-primary-500 dark:text-primary-100 text-sm  sm:pl-3"
												>{data.Country}</td
											>
											<td
												style="width:10%;"
												class="whitespace-nowrap text-sm px-3 py-2 text-primary-500 dark:text-primary-100"
												>{data.Count}</td
											>
											<td
												style="width:15%;"
												class="whitespace-nowrap px-3 py-2 text-sm text-primary-500 dark:text-primary-100"
											>
												<div class="flex items-center">
													<div class="h-2 w-1/4 rounded-full bg-primary-200 mr-2">
														<div
															class="h-2 rounded-full bg-primary-500"
															style="width:{data.Ratio}%"
														/>
													</div>
													<span class="text-primary-500 dark:text-primary-100 ">{data.Ratio}</span>
													<span class="text-primary-500 dark:text-primary-100 text-xs">%</span>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div>
				<select
					name="year"
					id=""
					class="select w-2/3 mt-3 "
					on:change={handlelSelectYearForCountry}
				>
					<option selected disabled>All the years</option>
					{#each years as year }
					<option value= {year.year}>{year.year}</option>
					{/each}
				</select>
				<div class="w-64 h-64">
					{#if cuntryDistributionData}
						<PieChart
							labels={cuntryDistributionLabels}
							data={cuntryDistributionData}
							title="Country"
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="flex justify-center items-center h-full gap-10 w-full">
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
		>
			<div class="w-full">
				<div class="flex items-center">
					<h4 class="mr-4 w-2/3 text-left justify-center py-3 ml-4 text-lg font-semibold text-primary-500 dark:text-primary-100 sm:pl-3">Marital Status</h4>
					<select name="year" id="" class="select w-1/3 mt-3" on:change={handlelSelectYearForMaritalStatus}>
						<option selected>All the years</option>
							{#each years as year }
								<option value= {year.year}>{year.year}</option>
							{/each}
					</select>
				</div>
			
				{#if maritalStatusDistributionData}
				<div class="h-96">
					<BarChart
						dataSource={maritalStatusDistributionData}
						labels={maritalStatusDistributionLabels}
						title="Marital Status"
					/>
			 </div>
				{/if}
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
		>
		<div class="w-full">
			<div class="flex items-center">
				<h4 class="mr-4 w-2/3 text-left justify-center py-3 ml-4 text-lg font-semibold text-primary-500 dark:text-primary-100 sm:pl-3">Major Ailments</h4>
				<select name="year" id="" class="select w-1/3 mt-3" on:change={handlelSelectYearForMajorAilments}>
					<option selected>All the years</option>
						{#each years as year }
							<option value= {year.year}>{year.year}</option>
						{/each}
				</select>
			</div>
		
			{#if majorAilmentDistributionData}
				<div class="h-96">
					<BarChart
						dataSource={majorAilmentDistributionData}
						labels={majorAilmentDistributionLabels}
						title="Major Ailments"
					/>
				</div>
			{/if}
		</div>
		</div>
	</div>

	<div class="flex justify-start items-center h-96 gap-10 w-full mt-10">
		<!-- <div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
		>
			<div class="w-full">
				<div class="flex items-center">
					<h4 class="mr-4 w-2/3 text-left justify-center py-3 ml-4 text-lg font-semibold text-primary-500 dark:text-primary-100 sm:pl-3">Obesity</h4>
					<select name="year" id="" class="select w-1/3 mt-3" on:change={handlelSelectYearForObesity}>
						<option selected>All the years</option>
							{#each years as year }
								<option value= {year.year}>{year.year}</option>
							{/each}
					</select>
				</div>
			
				{#if obesityDistributionData}
					<div class="h-96">
						<BarChart
							dataSource={obesityDistributionData}
							labels={obesityDistributionLabels}
							title="Obesity"
						/>
					</div>
				{/if}
			</div>
		</div> -->
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
		>
			<!-- <div class="h-96 w-full">
				<BarChart
					dataSource={addictionDistributionData}
					labels={addictionDistributionLabels}
					title="Addiction"
				/>
			</div> -->
			<div class="w-full">
				<div class="flex items-center">
					<h4 class="mr-4 w-2/3 text-left justify-center py-3 ml-4 text-lg font-semibold text-primary-500 dark:text-primary-100 sm:pl-3">Addiction</h4>
					<select name="year" id="" class="select w-1/3 mt-3" on:change={handlelSelectYearForAddiction}>
						<option selected>All the years</option>
							{#each years as year }
								<option value= {year.year}>{year.year}</option>
							{/each}
					</select>
				</div>
			
				{#if addictionDistributionData}
					<div class="h-96">
						<BarChart
							dataSource={addictionDistributionData}
							labels={addictionDistributionLabels}
							title="Addiction"
						/>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- <div class="flex justify-center items-center h-96 gap-10 w-full mt-10">
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
		>
			<div class="h-96 w-full ">
				<HorizontalBarChart
					dataSource={healthPillarDistributionData}
					labels={healthPillarDistributionLabels}
					title="Health Pillar Utilization (Total)"
				/>
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
		>
			<div class="h-96 w-full">
				<HealthPillarChart {healthPillarDistributionMonthly} />
			</div>
		</div>
	</div> -->
<!-- 
	<div class="flex justify-center items-center h-96 gap-10 w-full mt-10">
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
		>
			<div class="h-96 w-full ">
				<HorizontalBarChart
					dataSource={biometricsDistributionData}
					labels={biometricsDistributionLabels}
					title="Biometrics (Total)"
				/>
			</div>
		</div>
		<div
			class="flex overflow-x-auto justify-center items-center rounded-lg  shadow-xl border border-secondary-100 dark:border-surface-700 sm:px-4 w-1/2"
		>
			<div class="h-96 w-full">
				<BiometricsChart {biometricsDistributionMonthly} />
			</div>
		</div>
	</div> -->
</div>
