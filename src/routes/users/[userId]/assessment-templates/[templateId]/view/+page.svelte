<script lang="ts">
	import Fa from 'svelte-fa';
	import { faMultiply, faPen } from '@fortawesome/free-solid-svg-icons';
	import { onMount } from 'svelte';
	import { show } from '$lib/utils/message.utils';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { page } from '$app/stores';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
	let id = data.assessment.id;
	let title = data.assessment.Title;
	let description = data.assessment.Description;
	let displayCode = data.assessment.DisplayCode;
	let type = data.assessment.Type;
	let providerAssessmentCode = data.assessment.ProviderAssessmentCode;
	let serveListNodeChildrenAtOnce = data.assessment.ServeListNodeChildrenAtOnce;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const templateId = $page.params.templateId;
	const editRoute = `/users/${userId}/assessment-templates/${templateId}/edit`;
	const viewRoute = `/users/${userId}/assessment-templates/${templateId}/view`;
	const assessmentsRoutes = `/users/${userId}/assessment-templates`;
	const nodeRoute =`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/create`;

	const breadCrumbs = [
		{
			name: 'Assessment-Template',
			path: assessmentsRoutes
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="px-3 mb-5">
		<form
			method="get"
			class="w-full lg:max-w-4xl md:max-w-xl sm:max-w-lg mb-10 bg-[#ECE4FC] mt-6 rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white lg:text-xl text-lg ">
					<div class="lg:hidden md:hidden block">View Assessment Template</div>
					<div class="lg:block md:block hidden">View Assessment Template</div>
					<a href={assessmentsRoutes}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>

			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Title</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="title">{title}</span>
			</div>
			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Description</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="description">{description}</span>
			</div>

			<div class="flex items-center my-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Display code</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="displayCode"> {displayCode} </span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Type</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="type"> {type} </span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Provider assessment code</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="providerAssessmentCode">
					{providerAssessmentCode}
				</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Serve list node childrenAt once</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="serveListNodeChildrenAtOnce">
					{serveListNodeChildrenAtOnce}
				</span>
			</div>

			<div class="flex  items-center mt-10 lg:mx-10 md:mx-16">
        <div class="lg:w-8/12 min-[280px]:w-1/3 sm:w-1/2 md:w-1/2" />
        <div class="flex lg:w-1/3 gap-3 min-[280px]:w-2/4 ">
          <a href={nodeRoute}>
          <button
              type="submit"
              class="btn variant-filled-primary lg:w-full md:w-28 sm:w-28 min-[280px]:w-28 w-20 mb-8 lg:mr-4 mr-1   "
            >
             Add Node
            </button>
          </a>
          <a href={editRoute}>
            <button
              type="submit"
              class="btn variant-filled-primary lg:w-full md:w-28 sm:w-24 min-[280px]:w-24 w-20 mb-8 lg:mr-4 mr-1 "
            >
              Edit
              <Fa icon={faPen} size="lg" class="lg:ml-4 sm:ml-2 ml-1" />
            </button>
          </a>
        </div>
      </div>
		</form>
	</div>
</main>