<script lang="ts">
	import CareplanScheduleweek from './careplan-scheduleweek.svelte';
	import CareplanScheduleday from './careplan-scheduleday.svelte';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	export let userId = undefined;
	export let careplanId = undefined;
	export let classifiedByDay = [];
	export let classifiedByWeek = [];
	let showWeeks = true;
	let value: number = 0;
</script>

<div
	class="flex flex-col my-2 rounded-lg border border-secondary-100 dark:!border-surface-700 overflow-hidden"
>
	<div class="p-4 font-bold variant-soft-secondary">Careplan Schedule</div>
	<div class="flex items-center  my-3 justify-center ">
		<RadioGroup background = 'bg-surface-100' active="variant-filled-secondary" hover="hover:variant-soft-secondary">
			<RadioItem on:click = {() => (showWeeks = true)} bind:group={value} name="justify" value={0}>
				Week View
			</RadioItem>
			<RadioItem on:click ={() => (showWeeks = false)} bind:group={value} name="justify" value={1}>
				Day View
			</RadioItem>
		</RadioGroup>
	</div>

	{#if showWeeks}
		<CareplanScheduleweek on:deleteActivity {classifiedByWeek} {userId} {careplanId} />
	{:else}
		<CareplanScheduleday on:deleteActivity {classifiedByDay} {userId} {careplanId} />
	{/if}
</div>
