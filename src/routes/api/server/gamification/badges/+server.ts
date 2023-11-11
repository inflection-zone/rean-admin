import { deleteBadge } from '$routes/api/services/gamification/badge';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	try {
		console.log('Inside badge server endpoints');
		const response = await deleteBadge(data.sessionId, data.badgeId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting badge: ${err.message}`);
		return new Response(err.message);
	}
};
