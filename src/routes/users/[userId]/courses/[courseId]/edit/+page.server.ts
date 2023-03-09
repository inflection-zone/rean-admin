import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getCourseById, updateCourse } from '../../../../../api/services/courses';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const courseId = event.params.courseId;
		const response = await getCourseById(sessionId, courseId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const course = response.Data.Course;
		return {
			course
		};
	} catch (error) {
		console.error(`Error retriving course: ${error.message}`);
	}
};

export const actions = {
	updateCourseAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const courseId = event.params.courseId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();

		const name = data.has('name') ? data.get('name') : null;
		const description = data.has('description') ? data.get('description') : null;
		const imageUrl = data.has('imageUrl') ? data.get('imageUrl') : null;
	
		const response = await updateCourse(
			sessionId,
			courseId,
			name.valueOf() as string,
			description.valueOf() as string,
			imageUrl.valueOf() as string
		);
		const id = response.Data.Course.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/courses', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/courses/${id}/view`,
			successMessage(`course updated successful!`),
			event
		);
	}
};
