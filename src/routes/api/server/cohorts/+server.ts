import { deleteCohort } from '$routes/api/services/cohorts';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside cohort server endpoints');
		const response = await deleteCohort(data.sessionId, data.cohortId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting cohort: ${err.message}`);
		return new Response(err.message);
	}
};
