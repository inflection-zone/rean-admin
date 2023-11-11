import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getMeditationById, updateMeditation } from '$routes/api/services/careplan/assets/meditation';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');

  try {
    const meditationId = event.params.id;

    const response = await getMeditationById(sessionId, meditationId);

    const meditation = response.Data;
    console.log('meditation', meditation);
    return {
      meditation
    };
  } catch (error) {
    console.error(`Error retriving message: ${error.message}`);
  }
};

const updateMeditationSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	meditationType: z.string().optional(),
	recommendedDurationMin: zfd.numeric(z.number().optional()),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateMeditationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
    const meditationId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type MeditationSchema = z.infer<typeof updateMeditationSchema>;

		let result: MeditationSchema = {};
		try {
			result = updateMeditationSchema.parse(formDataValue);
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

		const response = await updateMeditation(
			sessionId,
      meditationId,
			result.name,
			result.description,
			result.meditationType,
			result.recommendedDurationMin,
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
			`/users/${userId}/careplan/assets/meditations/${id}/view`,
			successMessage(`Meditation updated successfully!`),
			event
		);
	}
};