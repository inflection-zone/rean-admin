import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchNewsfeedItems } from '../../../../../api/services/newsfeed-items';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchNewsfeedItems(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const newsfeedItems = response.Data.RssfeedItem.Items;
		return {
			newsfeedItems,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving newsfeedItems: ${error.message}`);
	}
};
