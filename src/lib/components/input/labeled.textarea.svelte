<script>
    // import {  Input , Textarea} from 'flowbite-svelte';
    import  Textarea  from "./textarea.svelte";
    export let title = "";
    export let name = "";
    export let placeholder = "";
    export let value = '';
   </script>

<div class="flex items-center mb-2 lg:mx-16 md:mx-12 mx-10">
    <div class="w-1/2 md:w-1/3 lg:w-1/3 ">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="font-semibold">{title}</label>
    </div>
    <div class="w-1/2 md:w-2/3 lg:w-2/3">
        <Textarea
            bind:value 
            name={name}
            placeholder={placeholder}
        />
    </div>
</div>