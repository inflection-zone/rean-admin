<script lang="ts">
 export let title = "Submit";
 export let type:'submit'|'reset'|'button' = "button"
</script>
<button on:click type={type} class="bg-primary hover:bg-[#5832A1] font-semibold rounded-lg text-base-100 h-10 w-full mb-10 ">
    {title}
</button>