import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBadgeCategoryById } from '$routes/api/services/gamification/badge.category';

////////////////////////////////////////////////////////////////////////////

 export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const badgeCategoryId = event.params.id;
		const response = await getBadgeCategoryById(sessionId, badgeCategoryId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const badgeCategory = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			badgeCategory,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving badge category: ${error.message}`);
	}
};