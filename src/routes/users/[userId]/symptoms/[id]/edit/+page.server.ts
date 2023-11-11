import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { BACKEND_API_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { getSymptomById, updateSymptom } from '../../../../../api/services/symptoms';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const symptomId = event.params.id;
		const response = await getSymptomById(sessionId, symptomId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const symptom = response.Data.SymptomType;
		const imageResourceId = symptom.ImageResourceId;
		if (imageResourceId) {
			symptom['ImageUrl'] =
				BACKEND_API_URL + `/file-resources/${imageResourceId}/download?disposition=inline`;
		} else {
			symptom['ImageUrl'] = null;
		}
		return {
			sessionId,
			symptom
		};
	} catch (error) {
		console.error(`Error retriving symptom: ${error.message}`);
	}
};

const updateSymptomSchema = zfd.formData({
	symptom: z.string().min(3).max(256),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	language: z.string().optional(),
	imageResourceId: z.string().optional()
});

export const actions = {
	updateSymptomAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const symptomId = event.params.id;
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type SymptomSchema = z.infer<typeof updateSymptomSchema>;

		let result: SymptomSchema = {};
		try {
			result = updateSymptomSchema.parse(formDataValue);
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

		const response = await updateSymptom(
			sessionId,
			symptomId,
			result.symptom,
			result.description,
			result.tags,
			result.language,
			result.imageResourceId
		);

		const id = response.Data.SymptomType.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/symptoms`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/symptoms/${id}/view`,
			successMessage(`Symptom updated successfully!`),
			event
		);
	}
};
