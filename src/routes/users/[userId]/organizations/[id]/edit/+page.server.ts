import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import type { OrganizationTypes } from '$lib/types/domain.models';
import { BACKEND_API_URL } from '$env/static/private';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getOrganizationById, updateOrganization } from '../../../../../api/services/organizations';
import { getOrganizationTypes } from '../../../../../api/services/types';
import { updateAddress } from '../../../../../api/services/addresses';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const organizationId = event.params.id;
		const response = await getOrganizationById(sessionId, organizationId);
		const types: OrganizationTypes[] = await getOrganizationTypes();

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const organization = response.Data.Organization;
		const imageResourceId = organization.ImageResourceId;
		if (imageResourceId) {
			organization['ImageUrl'] =
				BACKEND_API_URL + `/file-resources/${imageResourceId}/download?disposition=inline`;
		} else {
			organization['ImageUrl'] = null;
		}
		return {
			organization,
			types
		};
	} catch (error) {
		console.error(`Error retriving organization: ${error.message}`);
	}
};

const updateOrganizationSchema = zfd.formData({
	type: z.string(),
	name: z.string().min(3).max(64),
	contactPhone: z.string().min(10),
	contactEmail: z.string().email().min(8).max(64),
	about: z.string().optional(),
	operationalSince: z.string().optional(),
	addressType: z.string().min(3).max(64),
	addressLine: z.string().min(3).max(64),
	city: z.string().optional(),
	district: z.string().optional(),
	state: z.string().optional(),
	country: z.string().optional(),
	postalCode: zfd.numeric(z.number().optional()),
	imageResourceId: z.string().optional(),
	isHealthFacility: zfd.checkbox({ trueValue: 'true' }),
	addressId: z.string().uuid()
});

export const actions = {
	updateOrganizationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const organizationId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type OrganizationSchema = z.infer<typeof updateOrganizationSchema>;

		let result: OrganizationSchema = {};
		try {
			result = updateOrganizationSchema.parse(formData);
			console.log('result', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		const addressResponse = await updateAddress(
			sessionId,
			result.addressId,
			result.addressType,
			result.addressLine,
			result.city,
			result.district,
			result.state,
			result.country,
			result.postalCode
		);
		const addressesId_ = addressResponse.Data.Address.id;
		const addressesId = addressesId_.split(',');

		if (addressResponse.Status === 'failure' || addressResponse.HttpCode !== 200) {
			throw redirect(
				303,
				`/users/${userId}/organizations`,
				errorMessage(addressResponse.Message),
				event
			);
		}

		const response = await updateOrganization(
			sessionId,
			organizationId,
			result.type,
			result.name,
			result.contactPhone,
			result.contactEmail,
			result.about,
			result.operationalSince,
			addressesId,
			result.imageResourceId,
			result.isHealthFacility
		);
		console.log('response', response);
		const id = response.Data.Organization.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/organizations`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/organizations/${id}/view`,
			successMessage(`Organization updated successfully!`),
			event
		);
	}
};
