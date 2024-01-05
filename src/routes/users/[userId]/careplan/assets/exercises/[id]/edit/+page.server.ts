import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getExerciseById, updateExercise } from '$routes/api/services/careplan/assets/exercise';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const exerciseId = event.params.id;
		const response = await getExerciseById(sessionId, exerciseId);
		const exercise = response.Data;
		console.log('response', response);
		return {
			exercise
		};
	} catch (error) {
		console.error(`Error retriving exercise: ${error.message}`);
	}
};

const updateExerciseSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	exerciseType: z.string().optional(),
	intensityLevel: z.string().optional(),
	recommendedDurationMin: zfd.numeric(z.number().optional()),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateExerciseAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const exerciseId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type ExerciseSchema = z.infer<typeof updateExerciseSchema>;

		let result: ExerciseSchema = {};
		try {
			result = updateExerciseSchema.parse(formDataValue);
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

		const response = await updateExercise(
			sessionId,
			exerciseId,
			result.name,
			result.description,
			result.exerciseType,
			result.intensityLevel,
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
			`/users/${userId}/careplan/assets/exercises/${id}/view`,
			successMessage(`Exercise updated successfully!`),
			event
		);
	}
};
