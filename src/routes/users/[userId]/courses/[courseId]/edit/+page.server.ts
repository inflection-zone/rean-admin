import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
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

const updateCourseSchema = zfd.formData({
	name: z.string().max(256),
	description: z.string().optional(),
	durationInDays: zfd.numeric(z.number().optional()),
	imageUrl: z.string().optional(),
});

export const actions = {
	updateCourseAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const courseId = event.params.courseId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type CourseSchema = z.infer<typeof updateCourseSchema>;

		let result: CourseSchema = {};
		try {
			result = updateCourseSchema.parse(formData);
			console.log('result', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		const response = await updateCourse(
			sessionId,
			courseId,
			result.name,
			result.description,
			result.durationInDays,
			result.imageUrl,
		);
		const id = response.Data.Course.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/courses`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/courses/${id}/view`,
			successMessage(`Course updated successfully!`),
			event
		);
	}
};
