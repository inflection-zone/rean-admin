import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchModules } from '../../../../../api/services/modules';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchModules(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const modules = response.Data.CourseModules;
		return {
			modules,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving module: ${error.message}`);
	}
};
