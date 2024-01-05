import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCohortById } from '$routes/api/services/cohorts';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const cohortId = event.params.id;
		const response = await getCohortById(sessionId, cohortId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const cohort = response.Data.Cohort;
		const id = response.Data.Cohort.id;
		return {
			location: `${id}/edit`,
			cohort,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving cohort: ${error.message}`);
	}
};
