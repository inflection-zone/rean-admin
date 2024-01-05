import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getModuleById } from '../../../../../../../api/services/modules';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const moduleId = event.params.moduleId;
		const response = await getModuleById(sessionId, moduleId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const module = response.Data.CourseModule;
		const id = response.Data.CourseModule.id;
		return {
			location: `${id}/edit`,
			module,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving module: ${error.message}`);
	}
};
