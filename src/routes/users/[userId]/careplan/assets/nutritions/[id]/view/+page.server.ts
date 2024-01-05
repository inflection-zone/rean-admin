import { getNutritionById } from '$routes/api/services/careplan/assets/nutrition';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const nutritionId = event.params.id;
		const response = await getNutritionById(sessionId, nutritionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const nutrition = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			nutrition,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retrieving nutrition : ${error.message}`);
		throw redirect(303, '/');
	}
};
