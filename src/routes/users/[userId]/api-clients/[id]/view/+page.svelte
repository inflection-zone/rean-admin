<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Modalform from '$lib/components/modal/form.modal.svelte';
	import RenewApiKeyModal from '$lib/components/modal/renew.api.key.modal.svelte';
	import { showGetApiKeyModal, showRenewApiKeyModal } from '$lib/store/general.store';
	import Icon from '@iconify/svelte';
	import { clipboard } from '@skeletonlabs/skeleton';
	import type { PageServerData } from './$types';
	import toast from 'svelte-french-toast';

	////////////////////////////////////////////////////////////////////////////////////
	
	export let data: PageServerData;
	let id = data.apiClient.id;
	let clientName = data.apiClient.ClientName;
	let clientCode = data.apiClient.ClientCode;
	let phone = data.apiClient.Phone;
	let email = data.apiClient.Email;
	let apiKey = undefined;
	let copied = false;
	function onClickHandler(): void {
		copied = true;
		setTimeout(() => (copied = false), 1000);
	}

	const userId = $page.params.userId;
	const editRoute = `/users/${userId}/api-clients/${id}/edit`;
	const viewRoute = `/users/${userId}/api-clients/${id}/view`;
	const apiClientRoute = `/users/${userId}/api-clients`;

	const breadCrumbs = [
		{ name: 'Clients', path: apiClientRoute },
		{ name: 'View', path: viewRoute }
	];

	const onUpdateApiKey = async (userName: string, password: string, validFrom, validTill) => {
		console.log('userName', userName);
		console.log('password', password);
		console.log('ValidFrom', validFrom), console.log('ValidTo', validTill);
		await updateApiKey({
			clientCode,
			userName: userName,
			password: password,
			validFrom: validFrom,
			validTill: validTill
		});
	};

	async function updateApiKey(model) {
		const response = await fetch(`/api/server/api-client/renew-api-key`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
		const resp = await response.text();
		const apiKeyDetails = JSON.parse(resp);
		apiKey = apiKeyDetails.ApiKey;
		console.log(response);
		if (response.status !== 200) {
			toast.error(`Provide valid credentials !`);
		}
		toast.success(`Client api keys renewed successfully!`);
	}

	const onFormSubmit = async (userName, password) => {
		console.log('userName', userName);
		console.log('password', password);
		await getApiKey({ clientCode, userName: userName, password: password });
	};

	async function getApiKey(model) {
		const response = await fetch(`/api/server/api-client/get-api-key`, {
			method: 'POST',
			body: JSON.stringify(model),
			headers: { 'content-type': 'application/json' }
		});
		const resp = await response.text();
		const apiKeyDetails = JSON.parse(resp);
		apiKey = apiKeyDetails.ApiKey;
		console.log(response);
		if (response.status !== 200) {
			toast.error(`Provide valid credentials !`);
		}
		toast.success(`Client api keys retrieved successfully!`);
	}
</script>

<Modalform on:submit={async (e) => await onFormSubmit(e.detail.userName, e.detail.password)} />

<RenewApiKeyModal
	on:updateApiKey={async (e) => {
		await onUpdateApiKey(
			e.detail.userName,
			e.detail.password,
			e.detail.validFrom,
			e.detail.validTill
		);
	}}
/>

<BreadCrumbs crumbs={breadCrumbs} />

<div class="flex flex-wrap gap-2">
	<button
		class="btn variant-soft-secondary ml-auto"
		on:click|capture={() => showRenewApiKeyModal.set(true)}
	>
		Update API key
	</button>
	<button class="btn variant-soft-secondary" on:click|capture={() => showGetApiKeyModal.set(true)}>
		Get API key
	</button>
	<a href={editRoute} class="btn variant-filled-secondary">
		<Icon icon="material-symbols:edit-outline" />
		<span>Edit</span>
	</a>
</div>

<div class="table-container my-2 border border-secondary-100 dark:border-surface-700">
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>View Client</th>
				<th class="text-end">
					<a href={apiClientRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Client Name</td>
				<td>{clientName}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Client Code</td>
				<td>{clientCode}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Contact Number</td>
				<td>{phone}</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Email</td>
				<td>{email}</td>
			</tr>
			{#if apiKey === undefined}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Api Key</td>
					<td>Click on Get API key</td>
				</tr>
			{:else}
				<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
					<td>Api Key</td>
					<td class="flex items-center gap-2">
						<span class="span" id="email">{apiKey}</span>
						<button
							class="btn p-2 variant-soft-secondary"
							use:clipboard={apiKey}
							on:click={onClickHandler}
							disabled={copied}
						>
							<Icon icon="material-symbols:content-copy-outline-rounded" class="text-lg" />
						</button>
					</td>
				</tr>
			{/if}
		</tbody>
	</table>
</div>
