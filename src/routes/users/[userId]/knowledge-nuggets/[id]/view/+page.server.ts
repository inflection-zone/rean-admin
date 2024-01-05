import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getKnowledgeNuggetById } from '../../../../../api/services/knowledge-nuggets';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const knowledgeNuggetsId = event.params.id;
		const response = await getKnowledgeNuggetById(sessionId, knowledgeNuggetsId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const knowledgeNugget = response.Data.KnowledgeNugget;
		const id = response.Data.KnowledgeNugget.id;

		return {
			location: `${id}/edit`,
			knowledgeNugget,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving knowledge nuggets: ${error.message}`);
	}
};
