import { getWebNewsfeedById } from '$routes/api/services/careplan/assets/web-newsfeed';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const webNewsfeedId = event.params.id;
		const response = await getWebNewsfeedById(sessionId, webNewsfeedId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const webNewsfeed = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			webNewsfeed,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retrieving web newsfeed: ${error.message}`);
		throw redirect(303, '/');
	}
};
