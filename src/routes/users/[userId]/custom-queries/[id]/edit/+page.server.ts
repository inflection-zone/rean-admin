import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getQueryById } from '$routes/api/services/custom.query';

/////////////////////////////////////////////////////////////////////////
export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const queryId = event.params.id;
		const response = await getQueryById(sessionId, queryId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const query = response.Data.Query;
		const id = query.id;
		return {
			location: `${id}/edit`,
			query,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving query: ${error.message}`);
	}
};
