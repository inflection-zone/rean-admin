import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchEventTypes } from '$routes/api/services/gamification/event.types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchEventTypes(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const eventTypes = response.Data;
		return {
			eventTypes,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving event types: ${error.message}`);
	}
};
