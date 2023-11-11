import { deleteBadgeCategory } from '$routes/api/services/gamification/badge.category';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	try {
		console.log('Inside badge category server endpoints');
		const response = await deleteBadgeCategory(data.sessionId, data.badgeCategoryId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting badge category: ${err.message}`);
		return new Response(err.message);
	}
};