import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getPriorityById, updatePriority } from '../../../../../api/services/priorities';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const priorityId = event.params.id;
		const response = await getPriorityById(sessionId, priorityId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const priority = response.Data.PriorityType;
		const id = response.Data.PriorityType.id;
		return {
			location: `${id}/edit`,
			priority,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving priority: ${error.message}`);
	}
};

const updatePriorityTypeSchema = zfd.formData({
	type: z.string().max(256),
	tags: z.array(z.string()).optional()
});

export const actions = {
	updatePriorityAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const priorityId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type PriorityTypeSchema = z.infer<typeof updatePriorityTypeSchema>;

		let result: PriorityTypeSchema = {};
		try {
			result = updatePriorityTypeSchema.parse(formDataValue);
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

		const response = await updatePriority(sessionId, priorityId, result.type, result.tags);
		const id = response.Data.PriorityType.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/priorities`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/priorities/${id}/view`,
			successMessage(`Priority updated successfully!`),
			event
		);
	}
};
