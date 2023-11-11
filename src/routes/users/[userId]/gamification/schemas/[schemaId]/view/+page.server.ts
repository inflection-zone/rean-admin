import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSchemaById } from '$routes/api/services/gamification/schema';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const schemaId = event.params.schemaId;
		const response = await getSchemaById(sessionId, schemaId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const schema = response.Data;
		console.log('data', schema);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			schema: schema,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving schema: ${error.message}`);
	}
};