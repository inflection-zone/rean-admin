import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { createMeditation } from '$routes/api/services/careplan/assets/meditation';

/////////////////////////////////////////////////////////////////////////

const createMeditationSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	meditationType: z.string().optional(),
	recommendedDurationMin: zfd.numeric(z.number().optional()),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	createMeditationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type MeditationSchema = z.infer<typeof createMeditationSchema>;

		let result: MeditationSchema = {};
		try {
			result = createMeditationSchema.parse(formDataValue);
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

		const response = await createMeditation(
			sessionId,
			result.name,
			result.description,
			result.meditationType,
			result.recommendedDurationMin,
			result.tags,
			result.version
		);
		const id = response.Data.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
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
			successMessage(`Meditation created successfully!`),
			event
		);
	}
};
