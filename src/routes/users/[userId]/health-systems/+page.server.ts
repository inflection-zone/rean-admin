import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchHealthSystems } from '../../../api/services/health.systems';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchHealthSystems(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const healthSystems = response.Data.HealthSystems;
		return {
			healthSystems,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving healthSystems: ${error.message}`);
	}
};
