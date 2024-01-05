import type { RequestEvent } from '@sveltejs/kit';
import { deleteNewsfeedItem } from '../../services/newsfeed-items';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside newsfeed item server endpoints');
		const response = await deleteNewsfeedItem(data.sessionId, data.newsfeedItemId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting newsfeed item: ${err.message}`);
		return new Response(err.message);
	}
};
