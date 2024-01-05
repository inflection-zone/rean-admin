import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBadgeById } from '$routes/api/services/gamification/badge';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const badgeId = event.params.id;
		const response = await getBadgeById(sessionId, badgeId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const badge = response.Data;
		console.log('data', badge);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			badge: badge,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving badge : ${error.message}`);
	}
};
