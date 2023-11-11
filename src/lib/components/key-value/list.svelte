<script lang="ts">
	import Icon from "@iconify/svelte";
  import { items } from "../../store/key.value.store"; 
//  $:console.log('items', $items);
</script>

{#if $items.length > 0}
<section>
      {#each $items as item }
        <li>
        <span>{item.Key}</span> : <span>{item.Value}</span>
        <button class="btn variant-soft-secondary px-2 mt-1 ml-2" on:click="{() => items.delete(item.Key)}" aria-label="Delete">
          <Icon icon="material-symbols:close-rounded" class="text-lg" />
        </button>
    </li>
      {/each}
</section>
{/if}
