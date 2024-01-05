import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getEventTypeById } from '$routes/api/services/gamification/event.types';

////////////////////////////////////////////////////////////////////////////

 export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const eventTypeId = event.params.id;
		const response = await getEventTypeById(sessionId, eventTypeId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const eventType = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			eventType: eventType,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving event type: ${error.message}`);
	}
};