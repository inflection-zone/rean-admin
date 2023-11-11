import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getHealthSystemById } from '../../../../../api/services/health.systems';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const healthSystemId = event.params.id;
		const response = await getHealthSystemById(sessionId, healthSystemId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const healthSystem = response.Data.HealthSystem;
		const id = response.Data.HealthSystem.id;
		return {
			location: `${id}/edit`,
			healthSystem,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving health system: ${error.message}`);
	}
};
