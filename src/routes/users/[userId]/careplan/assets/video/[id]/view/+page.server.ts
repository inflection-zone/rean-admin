import { getVideoById } from '$routes/api/services/careplan/assets/video';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const videoId = event.params.id;
		const response = await getVideoById(sessionId, videoId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const video = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			video,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retrieving video: ${error.message}`);
		throw redirect(303, '/');
	}
};
