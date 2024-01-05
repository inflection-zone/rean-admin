import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getCourseContentById } from '../../../../../../../../../api/services/course.contents';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const contentId = event.params.contentId;
		const response = await getCourseContentById(sessionId, contentId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const content = response.Data.CourseContent;
		const id = response.Data.CourseContent.id;
		return {
			location: `${id}/edit`,
			content,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving content: ${error.message}`);
	}
};
