<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	export let labels: string[] = [];
	export let dataSource: number[] = [];
	export let title;
	let barChart;
	let ctx;
	$:dataSource;
  $:labels
	onMount(() => {
		ctx = barChart.getContext('2d');
		barChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: labels,
				datasets: [
					{
						data: dataSource,
						backgroundColor: ['#351e61', '#5832A1', '#7165E3', '#ECE4FC'],
						borderColor: ['#351e61', '#5832A1', '#7165E3', '#ECE4FC'],
						borderWidth: 1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				indexAxis: 'x',
				scales: {
					x: {
						grid: {
							display: false
						},
						ticks: {
							color: document.documentElement.classList.contains('dark') ? '#DED6EC' : '#5832A1'
						}
					},
					y: {
						beginAtZero: true,
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
						display: false,
						position: 'top',
						align: 'center',
						labels: {
							color: document.documentElement.classList.contains('dark') ? '#DED6EC' : '#5832A1'
						}
					},
					title: {
						display: false,
						text: title,
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

<canvas id="myChart" bind:this={barChart} />
