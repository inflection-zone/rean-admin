import { deleteEventType } from '$routes/api/services/gamification/event.types';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	try {
		console.log('Inside event type server endpoints');
		const response = await deleteEventType(data.sessionId, data.eventTypeId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting event type: ${err.message}`);
		return new Response(err.message);
	}
};