import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getHospitalById } from '../../../../../api/services/hospitals';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const hospitalId = event.params.id;
		const response = await getHospitalById(sessionId, hospitalId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const hospital = response.Data.Hospital;
		const id = response.Data.Hospital.id;
		return {
			location: `${id}/edit`,
			hospital,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving hospital: ${error.message}`);
	}
};
