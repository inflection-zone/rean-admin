import { deleteQuery } from '$routes/api/services/custom.query';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside query server endpoints');
		const response = await deleteQuery(data.sessionId, data.queryId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting query: ${err.message}`);
		return new Response(err.message);
	}
};
