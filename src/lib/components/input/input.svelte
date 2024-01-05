<script lang="ts">
	export let type = '';
	export let name = '';
	export let placeholder = '';
	export let required = false;
	export let value = undefined;
</script>

<input
 	 bind:value
	{name}
	{placeholder}
	{required}
	class="input border border-primary focus:outline-none focus:ring-primary rounded-md w-full h-10 pl-3 focus:border-primary focus:ring-opacity-20 border-opacity-20 hover:border-opacity-40"
/>
