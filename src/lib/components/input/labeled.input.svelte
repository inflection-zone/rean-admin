<script>
	// import {  Input , Textarea} from 'flowbite-svelte';
	import Input from './input.svelte';
	export let title = '';
	export let type = '';
	export let name = '';
	export let placeholder = '';
	export let required = false;
	export let value = '';
</script>

<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
	<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="font-semibold">{title}</label>
	</div>
	<div class="w-1/2 md:w-2/3 lg:w-2/3">
		<Input bind:value {type} {name} {placeholder} {required} />
	</div>
	<slot/>
</div>
