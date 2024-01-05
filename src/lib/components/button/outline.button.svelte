<script lang="ts">
    export let title = "Submit";
    export let type:'submit'|'reset'|'button' = "button"
</script>
   <button on:click type={type} class="border border-primary text-primary font-semibold hover:bg-[#5832A1] tracking-wide hover:text-base-100 rounded-lg h-10 w-full mb-10 ">
       {title}
       <slot/>
   </button>