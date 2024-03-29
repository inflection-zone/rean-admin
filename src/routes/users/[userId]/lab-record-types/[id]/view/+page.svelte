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
	let id = data.labRecordType.id;
	let typeName = data.labRecordType.TypeName;
	let displayName = data.labRecordType.DisplayName;
	let snowmedCode = data.labRecordType.SnowmedCode;
	let loincCode = data.labRecordType.LoincCode;
	let normalRangeMin = data.labRecordType.NormalRangeMin;
	let normalRangeMax = data.labRecordType.NormalRangeMax;
	let unit = data.labRecordType.Unit;

	onMount(() => {
		show(data);
		LocalStorageUtils.removeItem('prevUrl');
	});

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/lab-record-types/${id}/edit`;
	const viewRoute = `/users/${userId}/lab-record-types/${id}/view`;
	const labRecordTypesRoute = `/users/${userId}/lab-record-types`;

	const breadCrumbs = [
		{
			name: 'Lab-Records',
			path: labRecordTypesRoute
		},
		{
			name: 'View',
			path: viewRoute
		}
	];
</script>

<main class="h-screen mb-10">
	<BreadCrumbs crumbs={breadCrumbs} />

	<div class="">
		<form
			method="get"
			class="w-full  bg-[#ECE4FC] lg:mt-10 md:mt-8 sm:mt-6 mb-10 mt-4 lg:max-w-4xl md:max-w-xl sm:max-w-lg  rounded-lg mx-auto"
		>
			<div class="w-full  h-14 rounded-t-lg p-3  bg-[#7165E3]">
				<div class="ml-3 relative flex flex-row text-white lg:text-xl text-lg ">
					<div class="lg:hidden md:hidden block">View Lab Record Type</div>
					<div class="lg:block md:block hidden">View Lab Record Type</div>
					<a href={labRecordTypesRoute}>
						<Fa icon={faMultiply} size="lg" class="absolute right-0 lg:pr-3 pr-0 text-white" />
					</a>
				</div>
			</div>
			<div class="hidden">{id}</div>

			<div class="flex items-center mb-4 mt-10 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Type Name</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="typeName">{typeName}</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Display Name</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="displayName">{displayName}</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>SNOMED CODE</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="snowmedCode">{snowmedCode}</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>LOINC CODE</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="loincCode">{loincCode}</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Minimum Normal Range</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="normalRangeMin">{normalRangeMin}</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>Maximum Normal Range</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="normalRangeMax">{normalRangeMax}</span>
			</div>

			<div class="flex items-center mb-4 lg:mx-16 md:mx-12 mx-10">
				<div class="w-1/2 md:w-1/3 lg:w-1/3 ">
					<!-- svelte-ignore a11y-label-has-associated-control -->
					<label class="label">
						<span>unit</span>
					</label>
				</div>
				<span class="span w-1/2 md:2/3 lg:2/3" id="unit">{unit}</span>
			</div>

			<div class="flex items-center mt-7 lg:mx-16 md:mx-12 mr-10">
				<div class="lg:w-5/6 w-2/3 " />
				<div class="lg:w-1/6 w-1/3 ">
					<a href={editRoute}>
						<button
							type="submit"
							class="btn variant-ringed-primary lg:w-full w-24 mb-10 lg:mr-4 mr-1"
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
