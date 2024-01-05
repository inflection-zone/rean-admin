import { getGoalById } from '$routes/api/services/careplan/assets/goal';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const goalId = event.params.id;
		const response = await getGoalById(sessionId, goalId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const goal = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			goal,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retrieving goal: ${error.message}`);
		throw redirect(303, '/');
	}
};
