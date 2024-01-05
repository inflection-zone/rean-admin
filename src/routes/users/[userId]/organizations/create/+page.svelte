<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import { oragnizationTypesStore } from '$lib/store/general.store';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { showMessage } from '$lib/utils/message.utils';
	import Icon from '@iconify/svelte';
	import { Country } from 'country-state-city';
	import type { PageServerData } from './$types';
    import { enhance } from '$app/forms';

	///////////////////////////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	let country = Country.getAllCountries();
	const userId = $page.params.userId;
	let imageResourceId = '';
	let imageUrl = undefined;
	let fileinput;

	const createRoute = `/users/${userId}/organizations/create`;
	const organizationRoute = `/users/${userId}/organizations`;
	oragnizationTypesStore.set(data.types);
	LocalStorageUtils.setItem('personRoles', JSON.stringify(data.types));
	const oraganizationTypes = data.types;

	const breadCrumbs = [
		{
			name: 'Organizations',
			path: organizationRoute
		},
		{
			name: 'Create',
			path: createRoute
		}
	];

	const upload = async (imgBase64, filename) => {
		const data = {};
		console.log(imgBase64);
		const imgData = imgBase64.split(',');
		data['image'] = imgData[1];
		console.log(JSON.stringify(data));
		const res = await fetch(`/api/server/file-resources/upload`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				filename: filename
			},
			body: JSON.stringify(data)
		});
		console.log(Date.now().toString());
		const response = await res.json();
		if (response.Status === 'success' && response.HttpCode === 201) {
			const imageUrl_ = response.Data.FileResources[0].Url;
			console.log('imageUrl', imageUrl);
			const imageResourceId_ = response.Data.FileResources[0].id;
			console.log('imageResourceId_', imageUrl);
			if (imageResourceId_) {
				imageResourceId = imageResourceId_;
			}
		} else {
			showMessage(response.Message, 'error');
		}
	};

	const onFileSelected = async (e) => {
		let f = e.target.files[0];
		const filename = f.name;
		let reader = new FileReader();
		reader.readAsDataURL(f);
		reader.onload = async (e) => {
			fileinput = e.target.result;
			await upload(e.target.result, filename);
		};
	};
</script>

<BreadCrumbs crumbs={breadCrumbs} />

<form
	method="post"
	action="?/createOrganizationAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Create Organization</th>
				<th class="text-end">
					<a href={organizationRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type</td>
				<td>
					<select class="select w-full" name="type" placeholder="select type here...">
						{#each oraganizationTypes as types}
							<option>{types}</option>
						{/each}
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Name *</td>
				<td>
					<input
						type="text"
						name="name"
						placeholder="Enter name here..."
						class="input w-full {form?.errors?.name ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.name}
						<p class="text-error-500 text-xs">{form?.errors?.name[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Contact Number *</td>
				<td class="flex gap-2">
					<select
						name="countryCode"
						class="select select-primary w-20 lg:w-20 md:w-20 sm:w-18 min-[320px]:w-12"
					>
						<option>+91</option>
						<option>+94</option>
						<option>+93</option>
					</select>
					<input
						type="text"
						name="contactPhone"
						placeholder="Enter contact number here..."
						class="input {form?.errors?.contactPhone ? 'border-error-300 text-error-500' : ''}"
					/>
					{#if form?.errors?.contactPhone}
						<p class="text-error-500 text-xs">{form?.errors?.contactPhone[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Email *</td>
				<td>
					<input
						type="text"
						name="contactEmail"
						placeholder="Enter email here..."
						class="input w-full {form?.errors?.contactEmail
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.contactEmail}
						<p class="text-error-500 text-xs">{form?.errors?.contactEmail[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">About</td>
				<td>
					<textarea name="about" placeholder="Enter about here..." class="textarea" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Operational Since</td>
				<td>
					<input
						type="date"
						name="operationalSince"
						placeholder="Enter operational since here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Address Type *</td>
				<td>
					<select
						name="addressType"
						class="select w-full"
						placeholder="Select address type here..."
					>
						<option>Home</option>
						<option>Office</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Address Line *</td>
				<td>
					<input
						type="text"
						name="addressLine"
						placeholder="Enter address here..."
						class="input w-full {form?.errors?.addressLine
							? 'border-error-300 text-error-500'
							: ''}"
					/>
					{#if form?.errors?.addressLine}
						<p class="text-error-500 text-xs">{form?.errors?.addressLine[0]}</p>
					{/if}
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>City</td>
				<td>
					<input type="text" name="city" placeholder="Enter city here..." class="input" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>District</td>
				<td>
					<input type="text" name="district" placeholder="Enter district here..." class="input" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>State/Province</td>
				<td>
					<select name="state" class="select" placeholder="Select state here...">
						<option>Maharashtra</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Country</td>
				<td>
					<input type="text" name="country" placeholder="Enter country here..." class="input" />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Zip/Postal Code</td>
				<td>
					<input
						type="text"
						name="postalCode"
						placeholder="Enter postal code or zip code here..."
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Image </td>
				<td>
					<input
						name="fileinput"
						type="file"
						class="true input w-full"
						placeholder="Image"
						on:change={async (e) => await onFileSelected(e)}
					/>
					<input type="hidden" name="imageResourceId" bind:value={imageResourceId} />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Is Health Facility Available</td>
				<td>
					<input
						type="checkbox"
						name="isHealthFacility"
						class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
					/>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex p-2 justify-end">
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
