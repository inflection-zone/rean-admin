
import { getPriorityById } from '$routes/api/services/careplan/assets/priority';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const priorityId = event.params.id;
		const response = await getPriorityById(sessionId, priorityId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const priority = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			priority,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retrieving priority: ${error.message}`);
		throw redirect(303, '/');
	}
};
