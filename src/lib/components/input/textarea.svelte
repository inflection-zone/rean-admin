<script>
    // import {  Input , Textarea} from 'flowbite-svelte';
    export let name = "";
    export let placeholder = "";
    export let value = undefined;
   </script>
        <textarea
           bind:value
            name={name}
            placeholder={placeholder}
            class="border border-primary focus:ring-primary rounded-md input-info w-full focus:border-primary focus:ring-opacity-20 border-opacity-20 hover:border-opacity-40"
        />