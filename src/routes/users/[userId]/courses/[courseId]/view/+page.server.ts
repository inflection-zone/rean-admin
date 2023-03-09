import type { PageServerLoad } from './$types';
import { error,type RequestEvent } from '@sveltejs/kit';
import { getCourseById } from '../../../../../api/services/courses';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const courseId = event.params.courseId;
		console.log("courseId",courseId)
		const response = await getCourseById(sessionId, courseId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		console.log("course",response);
		const course = response.Data.Course;
		const id = response.Data.Course.id;
		return {
			location: `${id}/edit`,
			course,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving course: ${error.message}`);
	}
};
