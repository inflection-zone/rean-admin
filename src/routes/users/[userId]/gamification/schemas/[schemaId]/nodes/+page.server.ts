import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchNodes } from '$routes/api/services/gamification/node';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
    const schemaId = event.params.schemaId;
		const searchParams = {
			schemaId: schemaId
		};
		const response = await searchNodes(sessionId, searchParams);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const nodes = response.Data.Items;
		return {
      nodes,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving nodes: ${error.message}`);
	}
};