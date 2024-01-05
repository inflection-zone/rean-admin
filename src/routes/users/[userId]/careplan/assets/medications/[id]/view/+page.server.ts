import { getMedicationById } from '$routes/api/services/careplan/assets/medication';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const medicationId = event.params.id;
		const response = await getMedicationById(sessionId, medicationId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const medication = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			medication,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retrieving medication: ${error.message}`);
		throw redirect(303, '/');
	}
};
