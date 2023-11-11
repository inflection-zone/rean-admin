import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createOrganization } from '../../../../api/services/organizations';
import { createAddress } from '../../../../api/services/addresses';
import type { OrganizationTypes } from '$lib/types/domain.models';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import type { PageServerLoad } from './$types';
import { getOrganizationTypes } from '../../../../api/services/types';

/////////////////////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async () => {
	try {
		const types: OrganizationTypes[] = await getOrganizationTypes();
		return {
			message: 'Common data successfully retrieved!',
			types
		};
	} catch (error) {
		console.error(`Error retieving data : ${error.message}`);
		throw redirect(400, '/');
	}
};

const createOrganizationSchema = zfd.formData({
	type: z.string(),
	name: z.string().min(3).max(64),
	countryCode: z.string(),
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
	isHealthFacility: zfd.checkbox()
});

export const actions = {
	createOrganizationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type OrganizationSchema = z.infer<typeof createOrganizationSchema>;

		let result: OrganizationSchema = {};
		try {
			result = createOrganizationSchema.parse(formData);
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

		const phone = result.countryCode + '-' + result.contactPhone;
		const addressResponse = await createAddress(
			sessionId,
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

		console.log("Address---",addressResponse.Data.Address);

		if (addressResponse.Status === 'failure' || addressResponse.HttpCode !== 201) {
			throw redirect(303, '/organizations', errorMessage(addressResponse.Message), event);
		}

		const response = await createOrganization(
			sessionId,
			result.type,
			result.name,
			phone,
			result.contactEmail,
			result.about,
			result.operationalSince,
			addressesId,
			result.imageResourceId,
			result.isHealthFacility
		);

		console.log("Organization",response.Data.Organization);
		const id = response.Data.Organization.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/organizations`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/organizations/${id}/view`,
			successMessage(`Organization created successfully!`),
			event
		);
	}
};
