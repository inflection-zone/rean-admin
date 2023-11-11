<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Icon from '@iconify/svelte';

	/////////////////////////////////////////////////////////////////////////////////////////////////////////////

	export let form;
	const userId = $page.params.userId;
	const createRoute = `/users/${userId}/api-clients/create`;
	const apiClientRoute = `/users/${userId}/api-clients`;

	const breadCrumbs = [
		{ name: 'Clients', path: apiClientRoute },
		{ name: 'Create', path: createRoute }
	];
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createApiClientAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Client</th>
				<th class="text-end">
					<a href={apiClientRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Client Name *</td>
				<td>
					<input
						type="text"
						name="clientName"
						placeholder="Enter client name here..."
						class="input w-full {form?.errors?.clientName
							? 'border-error-300'
							: 'border-primary-200'}"
					/>
					{#if form?.errors?.clientName}
						<p class="text-error-500 text-xs">{form?.errors?.clientName[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Password *</td>
				<td>
					<input
						type="password"
						name="password"
						placeholder="Enter password here..."
						class="input w-full {form?.errors?.password
							? 'border-error-300'
							: 'border-primary-200'}"
					/>
					{#if form?.errors?.password}
						<p class="text-error-500 text-xs">{form?.errors?.password[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Contact Number *</td>
				<td>
					<input
						type="text"
						name="phone"
						placeholder="Enter phone here..."
						class="input w-full {form?.errors?.phone ? 'border-error-300' : 'border-primary-200'}"
					/>
					{#if form?.errors?.phone}
						<p class="text-error-500 text-xs">{form?.errors?.phone[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Email *</td>
				<td>
					<input
						type="text"
						name="email"
						placeholder="Enter email here..."
						class="input w-full {form?.errors?.email ? 'border-error-300' : 'border-primary-200'}"
					/>
					{#if form?.errors?.email}
						<p class="text-error-500 text-xs">{form?.errors?.email[0]}</p>
					{/if}
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
