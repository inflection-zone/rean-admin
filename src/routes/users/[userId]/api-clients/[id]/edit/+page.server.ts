import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getApiClientById, updateApiClient } from '../../../../../api/services/api-clients';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const apiClientId = event.params.id;
		const response = await getApiClientById(sessionId, apiClientId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const apiClient = response.Data.Client;
		return {
			apiClient
		};
	} catch (error) {
		console.error(`Error retriving api client: ${error.message}`);
	}
};

const updateApiClientSchema = z.object({
	clientName: z.string().min(3).max(64),
	phone: z.string().min(10).max(64),
	email: z.string().email().min(10).max(64),
	password: z.string().min(6).max(15)
});

export const actions = {
	updateApiClientAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const apiClientId = event.params.id;
		const formData = Object.fromEntries(await request.formData());
		type ApiClientSchema = z.infer<typeof updateApiClientSchema>;
		let result: ApiClientSchema = {};
		try {
			result = updateApiClientSchema.parse(formData);
			console.log('result-----------', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		const response = await updateApiClient(
			sessionId,
			apiClientId,
			result.clientName,
			result.password,
			result.phone,
			result.email
		);
		const id = response.Data.Client.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/api-clients`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/api-clients/${id}/view`,
			successMessage(`Api client updated successfully!`),
			event
		);
	}
};
