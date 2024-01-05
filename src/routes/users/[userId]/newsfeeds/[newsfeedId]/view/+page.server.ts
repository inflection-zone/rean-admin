import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getNewsfeedById } from '../../../../../api/services/newsfeeds';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const newsfeedId = event.params.newsfeedId;
		const response = await getNewsfeedById(sessionId, newsfeedId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const newsfeed = response.Data.Rssfeed;
		const id = response.Data.Rssfeed.id;
		return {
			sessionId,
			location: `${id}/edit`,
			newsfeed,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving newsfeed: ${error.message}`);
	}
};
