import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchQueries } from '$routes/api/services/custom.query';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);
	try {
		const response = await searchQueries(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const queries = response.Data.Queries;
		console.log("queries", queries)
		return {
			queries,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving queries: ${error.message}`);
	}
};