import { redirect } from 'sveltekit-flash-message/server';
import { error, type RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createCohort } from '$routes/api/services/cohorts';
import { searchTenants } from '$routes/api/services/tenants';
import type { PageServerLoad } from './$types';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchTenants(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const tenants = response.Data.TenantRecords.Items;
		return {
			tenants,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving tenants: ${error.message}`);
	}
};
const createCohortSchema = zfd.formData({
	tenantId: z.string().optional(),
	name: z.string().min(3).max(256),
	description: z.string().optional(),
	imageUrl: z.string().optional()
});

export const actions = {
	createCohortAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type CohortSchema = z.infer<typeof createCohortSchema>;

		let result: CohortSchema = {};
		try {
			result = createCohortSchema.parse(formDataValue);
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

		const response = await createCohort(
			sessionId,
			result.tenantId,
			result.name,
			result.description,
			result.imageUrl
		);
		const id = response.Data.Cohort.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/cohorts`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/cohorts/${id}/view`,
			successMessage(`Cohort created successfully!`),
			event
		);
	}
};
