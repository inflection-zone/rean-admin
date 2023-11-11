import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchSchemas } from '$routes/api/services/gamification/schema';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchSchemas(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const schemas = response.Data;
		return {
			schemas: schemas,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving Schemas: ${error.message}`);
	}
};