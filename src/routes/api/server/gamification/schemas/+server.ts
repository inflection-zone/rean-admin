import { deleteSchema } from '$routes/api/services/gamification/schema';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	try {
		console.log('Inside schema server endpoints');
		const response = await deleteSchema(data.sessionId, data.schemaId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting schema: ${err.message}`);
		return new Response(err.message);
	}
};