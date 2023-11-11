import { getExerciseById } from '$routes/api/services/careplan/assets/exercise';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const exerciseId = event.params.id;
		const response = await getExerciseById(sessionId, exerciseId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const exercise = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			exercise,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving exercise: ${error.message}`);
		throw redirect(303, '/');
	}
};
