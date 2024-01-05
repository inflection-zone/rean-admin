import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getPriorityById, updatePriority } from '$routes/api/services/careplan/assets/priority';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const priorityId = event.params.id;

		const response = await getPriorityById(sessionId, priorityId);
		const priority = response.Data;
		return {
			priority
		};
	} catch (error) {
		console.error(`Error retriving priority: ${error.message}`);
	}
};

const updatePrioritySchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
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

		type PrioritySchema = z.infer<typeof updatePrioritySchema>;

		let result: PrioritySchema = {};
		try {
			result = updatePrioritySchema.parse(formDataValue);
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

		const response = await updatePriority(
			sessionId,
			priorityId,
			result.name,
			result.description,
			result.tags,
			result.version
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(
				303,
				`/users/${userId}/careplan/assets`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/careplan/assets/priorities/${id}/view`,
			successMessage(`Priority updated successfully!`),
			event
		);
	}
};
