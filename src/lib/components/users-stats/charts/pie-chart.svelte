<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	export let labels: string[];
	export let data: number[];
	export let title: string;

	$:data;

	let pieChart;
	let ctx;

	onMount(async () => {
		ctx = pieChart.getContext('2d');
		pieChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: labels,
				datasets: [
					{
						data: data,
						backgroundColor: ['#351e61', '#5832A1', '#7165E3', '#ECE4FC'],
						hoverBackgroundColor: ['#422679', '#8a70bd', '#9c93eb', '#f2ecfd']
					}
				]
			},
			options: {
				responsive: true,
				layout: {
					padding: {
						left: 10,
						right:10, 
						top: 10,
						bottom:10
					}
				},
				plugins: {
					legend: {
						display: true,
						position: 'bottom',
						labels: {
							boxWidth:10,
							boxHeight:10,
							color: '#5832A1',
						}
					},
					title: {
					    display: true,
					    text: title,
					    position: "top",
							color: '#5832A1',
							align:'center',
							padding:20,
							font:{
					  size: 22,
					  weight: 'normal',
					  lineHeight: 1.2,
							},
					},
				}
			}
		});
	});

</script>

<div class="">
	<canvas id="pieChart" bind:this={pieChart} />
</div>
