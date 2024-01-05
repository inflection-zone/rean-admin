<script lang="ts">
	import { enhance } from "$app/forms";
  import { page } from '$app/stores';
  import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';

  const userId = $page.params.userId;

  const importRoute = `/users/${userId}/assessment-templates/import`;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;

  const breadCrumbs = [
		{ name: 'Assessments', path: assessmentsRoutes },
		{ name: 'Import', path: importRoute }
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />
<form
	method="post"
	action="?/importAssessment"
  use:enhance enctype="multipart/form-data"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700 "
>
<table class="table">
  <thead class="!variant-soft-secondary">
    <tr class="content-center">
      <th class="text-center">Import assessment template</th>
    </tr>
  </thead>
  <tbody class="!bg-white dark:!bg-inherit">
    <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
      <td class="text-center">
      <input 
      type="file" 
      name="name" 
      required
      class="true input w-[50%]"
      />
      </td>
    </tr>
    
    <tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
      <td class="text-center">
        <button type="submit" class="btn variant-filled-secondary">Upload</button>
      </td>
    </tr>
   </tbody>
</form>



<!-- <form method="post" 
    action="?/importAssessment"
    use:enhance enctype="multipart/form-data"
	>
    <div>
      <label for="file">Import Assessment template</label>
      <input type="file" 
      name="name" 
      required  
      class="true input w-full"
    />
	  <button type="submit" class="btn variant-filled-secondary">Upload</button>
	  
    </div>
</form> -->
