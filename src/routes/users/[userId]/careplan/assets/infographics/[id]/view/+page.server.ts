import { getInfographicsById } from '$routes/api/services/careplan/assets/infographics';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const infographicsId = event.params.id;
		const response = await getInfographicsById(sessionId, infographicsId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const infographics = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			infographics,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retrieving infographics: ${error.message}`);
		throw redirect(303, '/');
	}
};
