import type { RequestEvent } from '@sveltejs/kit';
import { deleteCourseContent } from '../../services/course.contents';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside course content server endpoints');
		const response = await deleteCourseContent(data.sessionId, data.courseContentId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting course content: ${err.message}`);
		return new Response(err.message);
	}
};
