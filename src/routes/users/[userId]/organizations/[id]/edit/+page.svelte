<script lang="ts">
	import { page } from '$app/stores';
	import BreadCrumbs from '$lib/components/breadcrumbs/breadcrums.svelte';
	import Image from '$lib/components/image.svelte';
	import { oragnizationTypesStore } from '$lib/store/general.store';
	import { LocalStorageUtils } from '$lib/utils/local.storage.utils';
	import { showMessage } from '$lib/utils/message.utils';
	import Icon from '@iconify/svelte';
	import date from 'date-and-time';
	import type { PageServerData } from './$types';
    import { enhance } from '$app/forms';

	//////////////////////////////////////////////////////////////////

	export let form;
	export let data: PageServerData;
	oragnizationTypesStore.set(data.types);
	LocalStorageUtils.setItem('personRoles', JSON.stringify(data.types));
	let oraganizationTypes = data.types;
	let id = data.organization.id;
	let type = data.organization.Type;
	let name = data.organization.Name;
	let contactNumber = data.organization.ContactPhone;
	let email = data.organization.ContactEmail;
	let about = data.organization.About;
	let addressType = data.organization.Addresses[0].Type;
	let addressLine = data.organization.Addresses[0].AddressLine;
	let city = data.organization.Addresses[0].City;
	let district = data.organization.Addresses[0].District;
	let state = data.organization.Addresses[0].State;
	let country = data.organization.Addresses[0].Country;
	let postalCode = data.organization.Addresses[0].PostalCode;
	let imageUrl = data.organization.ImageUrl ?? undefined;
	let imageResourceId = data.organization.ImageResourceId;
	let addresses = data.organization.Addresses;
	let isHealthFacility = data.organization.IsHealthFacility;
	let fileinput;
	let operationalSince = date.format(new Date(data.organization.OperationalSince), 'DD-MMM-YYYY');

	//Original data
	let _type = type;
	let _name = name;
	let _contactNumber = contactNumber;
	let _email = email;
	let _about = about;
	let _operationalSince = operationalSince;
	let _addressLine = addressLine;
	let _addressType = addressType;
	let _city = city;
	let _district = district;
	let _state = state;
	let _country = country;
	let _postalCode = postalCode;
	let _imageResourceId = imageResourceId;
	let _isHealthFacility = isHealthFacility;

	function handleReset() {
		type = _type;
		name = _name;
		contactNumber = _contactNumber;
		email = _email;
		about = _about;
		operationalSince = _operationalSince;
		addressLine = _addressLine;
		addressType = _addressType;
		city = _city;
		district = _district;
		state = _state;
		country = _country;
		postalCode = _postalCode;
		imageResourceId = _imageResourceId;
		isHealthFacility = _isHealthFacility;
	}

	const userId = $page.params.userId;

	const editRoute = `/users/${userId}/organizations/${id}/edit`;
	const viewRoute = `/users/${userId}/organizations/${id}/view`;
	const organizationRoute = `/users/${userId}/organizations`;

	const breadCrumbs = [
		{
			name: 'Organizations',
			path: organizationRoute
		},
		{
			name: 'Edit',
			path: editRoute
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
	action="?/updateOrganizationAction"
	class="table-container my-2 border border-secondary-100 dark:!border-surface-700"
	use:enhance
>
	<table class="table">
		<thead class="!variant-soft-secondary">
			<tr>
				<th>Edit Organization</th>
				<th class="text-end">
					<a href={viewRoute} class="btn p-2 -my-2 variant-soft-secondary">
						<Icon icon="material-symbols:close-rounded" class="text-lg" />
					</a>
				</th>
			</tr>
		</thead>
		<tbody class="!bg-white dark:!bg-inherit">
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Type</td>
				<td>
					<select
						class="select w-full"
						bind:value={type}
						name="type"
						placeholder="select type here..."
					>
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
						bind:value={name}
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
				<td>
					<input
						type="text"
						name="contactPhone"
						bind:value={contactNumber}
						placeholder="Enter contact number here..."
						class="input w-full max-w-md {form?.errors?.contactPhone
							? 'border-error-300 text-error-500'
							: ''}"
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
						bind:value={email}
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
					<textarea
						name="about"
						bind:value={about}
						placeholder="Enter about here..."
						class="textarea"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Operational Since</td>
				<td>
					<input
						type="text"
						name="operationalSince"
						bind:value={operationalSince}
						placeholder="Enter operational since here..."
						class="input"
					/>
				</td>
			</tr>
			{#each addresses as address}
				<input hidden type="text" name="addressId" value={address.id} />
			{/each}
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Address Type *</td>
				<td>
					<select
						name="addressType"
						class="select w-full"
						placeholder="Select address type here..."
						bind:value={addressType}
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
						bind:value={addressLine}
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
					<input
						type="text"
						name="city"
						placeholder="Enter city here..."
						bind:value={city}
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>District</td>
				<td>
					<input
						type="text"
						name="district"
						placeholder="Enter district here..."
						bind:value={district}
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>State/Province</td>
				<td>
					<select
						name="state"
						class="select w-1/2"
						placeholder="Select state here..."
						bind:value={state}
					>
						<option>Maharashtra</option>
					</select>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Country</td>
				<td>
					<input
						type="text"
						name="country"
						placeholder="Enter country here..."
						class="input w-1/3 "
						bind:value={country}
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Zip/Postal Code</td>
				<td>
					<input
						type="text"
						name="postalCode"
						placeholder="Enter postal code or zip code here..."
						bind:value={postalCode}
						class="input"
					/>
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td class="align-top">Image</td>
				<td>
					{#if imageUrl === 'undefined' || imageUrl == null}
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{:else}
						<Image cls="flex h-24 w-24 rounded-lg" source={imageUrl} w="24" h="24" />
						<input
							name="fileinput"
							type="file"
							class="true input w-full"
							placeholder="Image"
							on:change={async (e) => await onFileSelected(e)}
						/>
					{/if}
					<input type="hidden" name="imageResourceId" bind:value={imageResourceId} />
				</td>
			</tr>
			<tr class="!border-b !border-b-secondary-100 dark:!border-b-surface-700">
				<td>Is Health Facility Available</td>
				<td>
					<input
						type="checkbox"
						name="isHealthFacility"
						bind:value={isHealthFacility}
						bind:checked={isHealthFacility}
						class="checkbox checkbox-primary border-primary-200 hover:border-primary-400 checkbox-md ml-2"
					/>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="flex gap-2 p-2 justify-end">
		<button type="button" on:click={handleReset} class="btn variant-soft-secondary">Reset</button>
		<button type="submit" class="btn variant-filled-secondary">Submit</button>
	</div>
</form>
