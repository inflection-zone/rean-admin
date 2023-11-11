import { redirect } from 'sveltekit-flash-message/server';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createApiClient } from '../../../../api/services/api-clients';

/////////////////////////////////////////////////////////////////////////

const createApiClientSchema = z.object({
	clientName: z.string().min(3).max(64),
	phone: z.string().min(10).max(64),
	email: z.string().email().min(10).max(64),
	password: z.string().min(6).max(15)
});

export const actions = {
	createApiClientAction: async (event) => {
		const request = event.request;
		const sessionId = event.cookies.get('sessionId');
		const userId = event.params.userId;
		const formData = Object.fromEntries(await request.formData());

		type ApiClientSchema = z.infer<typeof createApiClientSchema>;

		let result: ApiClientSchema = {};
		try {
			result = createApiClientSchema.parse(formData);
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
		const countryCode = '+91';
		const phone = countryCode + '-' + result.phone;
		const response = await createApiClient(
			sessionId,
			result.clientName,
			result.password,
			phone,
			result.email
		);
		const id = response.Data.Client.id;
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/api-clients`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/api-clients/${id}/view`,
			successMessage(`Api client created successfully!`),
			event
		);
	}
};
