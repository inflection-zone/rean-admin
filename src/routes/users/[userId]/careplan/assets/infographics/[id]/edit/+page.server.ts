import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	getInfographicsById,
	updateInfographics
} from '$routes/api/services/careplan/assets/infographics';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const infographicsId = event.params.id;

		const response = await getInfographicsById(sessionId, infographicsId);
		const infographics = response.Data;
		return {
			infographics
		};
	} catch (error) {
		console.error(`Error retriving infographics: ${error.message}`);
	}
};

const updateInfographicsSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	pathUrl: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateInfographicsAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const infographicsId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type InfographicsSchema = z.infer<typeof updateInfographicsSchema>;

		let result: InfographicsSchema = {};
		try {
			result = updateInfographicsSchema.parse(formDataValue);
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

		const response = await updateInfographics(
			sessionId,
			infographicsId,
			result.name,
			result.description,
			result.pathUrl,
			result.tags,
			result.version
		);
		const id = response.Data.id;
		console.log(response);

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
			`/users/${userId}/careplan/assets/infographics/${id}/view`,
			successMessage(`Infographics updated successfully!`),
			event
		);
	}
};
