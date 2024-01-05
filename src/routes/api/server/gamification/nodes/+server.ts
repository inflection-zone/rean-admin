import { deleteNode } from '$routes/api/services/gamification/node';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	try {
		console.log('Inside node server endpoints');
		const response = await deleteNode(data.sessionId, data.nodeId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting node: ${err.message}`);
		return new Response(err.message);
	}
};