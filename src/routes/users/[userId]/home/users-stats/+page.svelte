<script lang="ts">
	import type { PageServerData } from './$types';
	import UsersStats from '$lib/components/users-stats/users-stats.svelte';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;

	// let totalUsers = data.totalUsers;
	// let activeUsers = data.activeUsers;
	let maritalStatusWiseUsers;
	let genderWiseUsers;
	let ageWiseUsers;
	let countryWiseUsers;
	let usersCount = data.overallUsersData;
	let majorAilment = data.majorAilment;
	// let obesityDistribution = data.obesityDistribution;
	let addictionDistribution = data.addictionDistribution;
	// let healthPillarDistribution = data.healthPillarDistribution;
	// let healthPillarDistributionMonthly = data.healthPillarDistributionMonthly;
	// let roleDistribution = data.roleDistribution;
	// let biometricsDistribution = data.biometricsDistribution;
	// let biometricsDistributionMonthly = data.biometricsDistributionMonthly;
	let deviceDetailWiseUsers = data.deviceDetailWiseUsers;
	let years =  data.years;
	console.log('years------------------',years)
	console.log('usersCount------------------',usersCount)
	$: genderWiseUsers;
	$: ageWiseUsers;	
	$: countryWiseUsers;
	genderWiseUsers = data.genderWiseUsers;
	ageWiseUsers = data.ageWiseUsers;
	countryWiseUsers = data.countryWiseUsers;
	maritalStatusWiseUsers = data.maritalStatusWiseUsers;

	let selectedYear;

countryWiseUsers = countryWiseUsers.map((item) => ({
  ...item,
  Country: item.Country || 'Not Specified',
}));

	// Age distribution of users
	const selectAgeWiseUsersDividionYearly = async (e) => {
		selectedYear = e.currentTarget.value;
		console.log('selected year', selectedYear);
		await searchAgeWiseDivisionOfUsers({
			sessionId: data.sessionId,
			year: selectedYear
		});
	};

	async function searchAgeWiseDivisionOfUsers(model) {
		let url = `/api/server/users-stats/search-users-by-age?year=${model.year}`;
		console.log(url);
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		ageWiseUsers = response;
		console.log('ageWiseUsers------------', ageWiseUsers);
	}

	// Gender distribution of users
	const selectGenderWiseUsersDividionYearly = async (e) => {
		selectedYear = e.currentTarget.value;
		console.log('selected year', selectedYear);
		await searchGenderWiseDivisionOfUsers({
			sessionId: data.sessionId,
			year: selectedYear
		});
		// window.location.href = `/users/${userId}/home`;
	};

	async function searchGenderWiseDivisionOfUsers(model) {
		let url = `/api/server/users-stats/search-users-by-gender?year=${model.year}`;
		console.log(url);
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		genderWiseUsers = response;
		console.log('genderWiseUsers------------', genderWiseUsers);
	}

	// Country distribution of users
	const selectCounrtyDistributionYearly = async (e) => {
		selectedYear = e.currentTarget.value;
		console.log('selected year', selectedYear);
		await searchCounrtyDistributionOfUsers({
			sessionId: data.sessionId,
			year: selectedYear
		});
		// window.location.href = `/users/${userId}/home`;
	};

	async function searchCounrtyDistributionOfUsers(model) {
		let url = `/api/server/users-stats/search-country-users-yearly?year=${model.year}`;
		console.log(url);
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		countryWiseUsers = response;
		countryWiseUsers = countryWiseUsers.map((item) => ({
		...item,
		Country: item.Country || 'Not Specified',
		}));
		console.log("countryWiseUsers", countryWiseUsers)
	}

	// Marital status distribution of users
	const selectMaritalSatusDistributionYearly = async (e) => {
		selectedYear = e.currentTarget.value;
		console.log('selected year', selectedYear);
		await searchMaritalStatusDistributionOfUsers({
			sessionId: data.sessionId,
			year: selectedYear
		});
		// window.location.href = `/users/${userId}/home`;
	};

	async function searchMaritalStatusDistributionOfUsers(model) {
		let url = `/api/server/users-stats/search-users-by-marital-status?year=${model.year}`;
		console.log(url);
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		maritalStatusWiseUsers = response;
	};

	// Major ailment distribution of users
	const selectMajorAilmentDistributionYearly = async (e) => {
		selectedYear = e.currentTarget.value;
		console.log('selected year', selectedYear);
		await searchMajorAilmentDistributionOfUsers({
			sessionId: data.sessionId,
			year: selectedYear
		});
		// window.location.href = `/users/${userId}/home`;
	};

	async function searchMajorAilmentDistributionOfUsers(model) {
		let url = `/api/server/users-stats/search-users-by-major-ailments?year=${model.year}`;
		console.log(url);
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		majorAilment = response;
	};

	//Obesity distribution of users
	// const selectObesityDistributionYearly = async (e) => {
	// 	selectedYear = e.currentTarget.value;
	// 	console.log('selected year', selectedYear);
	// 	await searchObesityDistributionOfUsers({
	// 		sessionId: data.sessionId,
	// 		year: selectedYear
	// 	});
	// 	// window.location.href = `/users/${userId}/home`;
	// };

	// async function searchObesityDistributionOfUsers(model) {
	// 	let url = `/api/server/users-stats/search-users-by-obesity?year=${model.year}`;
	// 	console.log(url);
	// 	const res = await fetch(url, {
	// 		method: 'GET',
	// 		headers: { 'content-type': 'application/json' }
	// 	});
	// 	const response = await res.json();
	// 	obesityDistribution = response;
	// };

	// Addiction distribution of users
	const selectAddictionDistributionYearly = async (e) => {
		selectedYear = e.currentTarget.value;
		console.log('selected year', selectedYear);
		await searchAddictionDistributionOfUsers({
			sessionId: data.sessionId,
			year: selectedYear
		});
	};

	async function searchAddictionDistributionOfUsers(model) {
		let url = `/api/server/users-stats/search-users-by-addiction?year=${model.year}`;
		console.log(url);
		const res = await fetch(url, {
			method: 'GET',
			headers: { 'content-type': 'application/json' }
		});
		const response = await res.json();
		addictionDistribution = response;
		console.log("addictionDistribution",addictionDistribution)
	};
</script>

<UsersStats
  {years}
	{ageWiseUsers}
	{genderWiseUsers}
	{maritalStatusWiseUsers}
	{countryWiseUsers}
	{majorAilment}
	{addictionDistribution}
	{usersCount}
	{deviceDetailWiseUsers}
	on:selectAgeWiseUsersDividionYearly={async (e) => {
		await selectAgeWiseUsersDividionYearly(e.detail.year);
	}}
	on:selectGenderWiseUsersDividionYearly={async (e) => {
		await selectGenderWiseUsersDividionYearly(e.detail.year);
	}}
	on:selectCountryDistributionYearly={async (e) => {
		await selectCounrtyDistributionYearly(e.detail.year);
	}}
	on:selectMaritalStatusDistributionYearly={async (e) => {
		await selectMaritalSatusDistributionYearly(e.detail.year);
	}}
	on:selectMajorAilmentDistributionYearly={async (e) => {
		await selectMajorAilmentDistributionYearly(e.detail.year);
	}}
	on:selectAddictionDistributionYearly={async (e) => {
		await selectAddictionDistributionYearly(e.detail.year);
	}}
/>

<!-- on:selectObesityDistributionYearly={async (e) => {
	await selectObesityDistributionYearly(e.detail.year);
}} -->