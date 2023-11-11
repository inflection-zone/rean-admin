import { getBiometricsById } from '$routes/api/services/careplan/assets/biometrics';
import type { PageServerLoad } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const biometricsId = event.params.id;
		const response = await getBiometricsById(sessionId, biometricsId);
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const biometrics = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			biometrics,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving audio ${error.message}`);
	}
};
