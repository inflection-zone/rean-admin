import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getNodeById } from '$routes/api/services/gamification/node';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const nodeId = event.params.nodeId;
		const response = await getNodeById(sessionId, nodeId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const schemaNode = response.Data;
		console.log('data', schemaNode);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
		  schemaNode,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving node: ${error.message}`);
	}
};