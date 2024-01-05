import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchPriorities } from '../../../api/services/priorities';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchPriorities(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const priorityTypes = response.Data.PriorityTypes;
		return {
			priorityTypes,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving priorities: ${error.message}`);
	}
};
