<script lang="ts">
	import {
		createDataTableStore,
		dataTableHandler,
		tableA11y,
		tableInteraction
	} from '@skeletonlabs/skeleton';
	import { Paginator } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import date from 'date-and-time';
	import Fa from 'svelte-fa';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Confirm from '$lib/components/modal/confirmModal.svelte';
	import { faPencil, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
	import type { PageServerData } from './$types';
	import { Helper } from '$lib/utils/helper';

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let data: PageServerData;
	let newsfeeds = data.newsfeeds;
	newsfeeds = newsfeeds.map((item, index) => ({ ...item, index: index + 1 }));

	const dataTableStore = createDataTableStore(newsfeeds, {
		search: '',
		sort: '',
		pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 30, 50] }
	});
	const userId = $page.params.userId;
	const newsfeedRoute = `/users/${userId}/newsfeeds`;
	const editRoute = (id) => `/users/${userId}/newsfeeds/${id}/edit`;
	const viewRoute = (id) => `/users/${userId}/newsfeeds/${id}/view`;
	const createRoute = `/users/${userId}/newsfeeds/create`;

	const breadCrumbs = [
		{
			name: 'Newsfeeds',
			path: newsfeedRoute
		}
	];

	let title = undefined;
	let category = undefined;
	let sortBy = 'CreatedAt';
	let sortOrder = 'ascending';
	let itemsPerPage = 10;
	let pageIndex = 0;

	const searchParams = async (title: string, category: string) => {
		await searchNewsfeed({
			title: title,
			category: category
		});
	};

	async function searchNewsfeed(model) {
		let url = `/api/server/newsfeeds/search?`;
		if (sortOrder) {
			url += `sortOrder=${sortOrder}`;
		} else {
			url += `sortOrder=ascending`;
		}
		if (sortBy) {
			url += `&sortBy=${sortBy}`;
		}
		if (itemsPerPage) {
			url += `&itemsPerPage=${itemsPerPage}`;
		}
		if (pageIndex) {
			url += `&pageIndex=${pageIndex}`;
		}
		if (title) {
			url += `&title=${title}`;
		}
		if (category) {
			url += `&category=${category}`;
		}

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		});

		const response = await res.json();
		newsfeeds = response.map((item, index) => ({ ...item, index: index + 1 }));

		dataTableStore.updateSource(newsfeeds);
	}

	dataTableStore.subscribe((model) => dataTableHandler(model));

	const handleNewsfeedDelete = async (e, id) => {
		const newsfeedId = id;
		await Delete({
			sessionId: data.sessionId,
			newsfeedId
		});
		window.location.href = newsfeedRoute;
	};

	async function Delete(model) {
		const response = await fetch(`/api/server/newsfeeds`, {
			method: 'DELETE',
			body: JSON.stringify(model),
			headers: {
				'content-type': 'application/json'
			}
		});
	}
</script>

<BreadCrumbs crumbs={breadCrumbs} />
<div
	class=" mr-14 mt-8 lg:flex-row md:flex-row sm:flex-col flex-col lg:block md:block sm:hidden hidden"
>
	<div class="basis-1/2 justify-center items-center ">
		<div class="relative flex items-center  " />
	</div>
	<div class="basis-1/2 justify-center items-center">
		<div class="relative flex items-center">
			<a href={createRoute} class="absolute right-1 lg:mr-[-20px]">
				<button
					class="btn variant-filled-primary w-28 rounded-lg hover:bg-primary bg-primary transition
          ease-in-out
          delay-150
          hover:scale-110
          duration-300 ... "
				>
					Add new
				</button>
			</a>
		</div>
	</div>
</div>
<div
	class="flex flex-row mx-10 lg:mt-10 md:mt-10 sm:mt-4 mt-4 lg:gap-7 md:gap-8 sm:gap-4 gap-4 lg:flex-row md:flex-row sm:flex-col min-[280px]:flex-col"
>
	<div class="basis-1/2 justify-center items-center ">
		<div class="relative flex items-center">
			<input
				type="text"
				placeholder="Search by title"
				bind:value={title}
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="basis-1/2 justify-center items-center">
		<div class="relative flex items-center  ">
			<input
				type="text"
				placeholder="Search by category"
				bind:value={category}
				class="input input-bordered input-primary w-full"
			/>
		</div>
	</div>
	<div class="sm:flex flex">
		<button
			class="btn variant-filled-primary lg:w-20 md:w-20 sm:w-20 w-20 rounded-lg bg-primary hover:bg-primary  "
			on:click={() => searchParams(title, category)}
		>
			<Fa icon={faSearch} class="text-neutral-content" size="lg" />
		</button>
		<a href={createRoute} class=" right-14 ">
			<button
				class="btn variant-filled-primary hover:bg-primary lg:hidden md:hidden block sm:w-40 w-24 ml-4 rounded-lg bg-primary transition
          ease-in-out
          delay-150
          hover:scale-110
          duration-300 ...  "
			>
				ADD NEW
			</button>
		</a>
	</div>
</div>
<div class="flex justify-center flex-col mx-10 mt-4 mb-10 overflow-y-auto ">
	<table class="table rounded-b-none" role="grid" use:tableInteraction use:tableA11y>
		<thead
			on:click={(e) => {
				dataTableStore.sort(e);
			}}
			on:keypress
			class="sticky top-0"
		>
			<tr>
				<th data-sort="index" style="width: 5%;">Id</th>
				<th data-sort="Title" style="width: 19%;">Title</th>
				<th style="width: 33%;">Link</th>
				<th data-sort="Category" style="width: 18%;">Category</th>
				<th style="width: 35%;">Newsfeed Items</th>
				<th style="width: 8%;" />
				<th style="width: 8%;" />
			</tr>
		</thead>
	</table>
	<div class=" overflow-y-auto h-[600px] bg-tertiary-500">
		<table class="table w-full">
			<tbody class="">
				{#each $dataTableStore.filtered as row}
					<tr>
						<td role="gridcell" aria-colindex={1} tabindex="0" style="width: 5%;">{row.index}</td>
						<td role="gridcell" aria-colindex={2} tabindex="0" style="width: 19%;"
							><a href={viewRoute(row.id)}>{Helper.truncateText(row.Title, 20)}</a></td
						>
						<td role="gridcell" aria-colindex={3} tabindex="0" style="width: 32%;"
							>{Helper.truncateText(row.Link, 40)}</td
						>
						<td role="gridcell" aria-colindex={4} tabindex="0" style="width: 19%;"
							>{row.Category}</td
						>
						<td role="gridcell" aria-colindex={5} tabindex="0" style="width: 20%;"
							>{#if newsfeeds.length <= 0}
								<span>null</span>
							{:else}
								{#each row.FeedItems as items}
									{Helper.truncateText(items.Title, 10)}
								{/each}
								<!-- {/each} -->
							{/if}
						</td>

						<td style="width: 8%;">
							<a href={editRoute(row.id)}
								><Fa icon={faPencil} style="color-text-primary" size="md" /></a
							>
						</td>
						<td style="width: 8%;"
							><Confirm
								confirmTitle="Delete"
								cancelTitle="Cancel"
								let:confirm={confirmThis}
								on:delete={(e) => {
									handleNewsfeedDelete(e, row.id);
								}}
							>
								<button
									on:click|preventDefault={() => confirmThis(handleNewsfeedDelete, row.id)}
									class=""><Fa icon={faTrash} /></button
								>
								<span slot="title"> Delete </span>
								<span slot="description"> Are you sure you want to delete a newsfeed? </span>
							</Confirm>
						</td></tr
					>
				{/each}
			</tbody>
		</table>
	</div>
	<div class=" w-full bg-secondary-500 h-36 lg:h-16 md:h-16 sm:h-36 mb-10 pt-1 rounded-b-lg ">
		{#if $dataTableStore.pagination}<Paginator
				class="mt-2 mr-3 ml-3 "
				buttonClasses="btn-icon bg-surface-500 w-5 h-8"
				text="text-white"
				bind:settings={$dataTableStore.pagination}
			/>{/if}
	</div>
</div>
