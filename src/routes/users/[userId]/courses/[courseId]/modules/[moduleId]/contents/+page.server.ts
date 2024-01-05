import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchCourseContents } from '../../../../../../../api/services/course.contents';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchCourseContents(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const courseContent = response.Data;
		return {
			courseContent,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving course content: ${error.message}`);
	}
};
