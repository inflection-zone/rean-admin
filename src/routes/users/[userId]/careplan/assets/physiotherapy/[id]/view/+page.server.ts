import { getPhysiotherapyById } from '$routes/api/services/careplan/assets/physiotherapy';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const physiotherapyId = event.params.id;
		const response = await getPhysiotherapyById(sessionId, physiotherapyId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const physiotherapy = response.Data;
		console.log(physiotherapy);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			physiotherapy,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retrieving physiotherapy : ${error.message}`);
		throw redirect(303, '/');
	}
};
