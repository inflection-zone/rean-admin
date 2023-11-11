<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let biometricsDistributionMonthly;

	let cholesterolUsers = biometricsDistributionMonthly.CholesterolUsers;
	let glucoseUsers = biometricsDistributionMonthly.GlucoseUsers;
	let oxygenSaturationUsers = biometricsDistributionMonthly.OxygenSaturationUsers;
	let bloodPressureUsers = biometricsDistributionMonthly.BloodPressureUsers;
	let bodyHeightUsers = biometricsDistributionMonthly.BodyHeightUsers;
	let bodyWeightUsers = biometricsDistributionMonthly.BodyWeightUsers;
	let bodyTempratureUsers = biometricsDistributionMonthly.BodyTempratureUsers;
	let pulseUsers = biometricsDistributionMonthly.PulseUsers;

	let labels = cholesterolUsers.map((x) => x.Month);
	let cholesterolUsersData = cholesterolUsers.map((x) => x.Count);
	let glucoseUsersData = glucoseUsers.map((x) => x.Count);
	let oxygenSaturationUsersData = oxygenSaturationUsers.map((x) => x.Count);
	let bloodPressureUsersData = bloodPressureUsers.map((x) => x.Count);
	let bodyHeightUsersData = bodyHeightUsers.map((x) => x.Count);
	let bodyWeightUsersData = bodyWeightUsers.map((x) => x.Count);
	let bodyTempratureUsersData = bodyTempratureUsers.map((x) => x.Count);
	let pulseUsersData = pulseUsers.map((x) => x.Count);

	let lineChart;
	let ctx;

	onMount(() => {
		ctx = lineChart.getContext('2d');
		lineChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Cholestrol',
						data: cholesterolUsersData,
						borderColor: 'green',
						fill: false
					},
					{
						label: 'Glucose',
						data: glucoseUsersData,
						borderColor: 'blue',
						fill: false
					},
					{
						label: 'Oxygen Saturation',
						data: oxygenSaturationUsersData,
						borderColor: 'red',
						fill: false
					},
					{
						label: 'Blood Pressure',
						data: bloodPressureUsersData,
						borderColor: 'purple',
						fill: false
					},
					{
						label: 'Body Height',
						data: bodyHeightUsersData,
						borderColor: 'blue',
						fill: false
					},
					{
						label: 'Body Weight',
						data: bodyWeightUsersData,
						borderColor: 'pink',
						fill: false
					},
					{
						label: 'Body Temprature',
						data: bodyTempratureUsersData,
						borderColor: 'gray',
						fill: false
					},
					{
						label: 'Pulse',
						data: pulseUsersData,
						borderColor: 'orange',
						fill: false
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					x: {
						grid: {
							display: false
						},
						ticks: {
							color: document.documentElement.classList.contains('dark') ? '#DED6EC' : '#5832A1' // set x-axis label color here
						}
					},
					y: {
						grid: {
							display: false
						},
						ticks: {
							color: document.documentElement.classList.contains('dark') ? '#DED6EC' : '#5832A1' // set y-axis label color here
						}
					}
				},
				layout: {
					padding: {
						bottom: 20 // Adjust the bottom padding value as needed
					}
				},
				plugins: {
					legend: {
						display: true,
						position: 'right',
						align: 'center',
						labels: {
							color: document.documentElement.classList.contains('dark') ? '#DED6EC' : '#5832A1',
							boxWidth: 10,
							boxHeight: 10
						}
					},
					title: {
						display: true,
						text: 'Biometrics (Monthly)',
						position: 'top',
						color: document.documentElement.classList.contains('dark') ? '#DED6EC' : '#5832A1',
						align: 'center',
						padding: 20,
						font: {
							size: 22,
							weight: 'normal',
							lineHeight: 1.2
						}
					}
				}
			}
		});
	});
</script>

<canvas id="line chart" bind:this={lineChart} />
