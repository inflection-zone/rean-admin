import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createCourse } from '../../../../api/services/courses';

/////////////////////////////////////////////////////////////////////////

const createCourseSchema = zfd.formData({
	name: z.string().max(256),
	description: z.string().optional(),
	durationInDays: zfd.numeric(z.number().optional()),
	imageUrl: z.string().optional(),
});

export const actions = {
	createCourseAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type CourseSchema = z.infer<typeof createCourseSchema>;

		let result: CourseSchema = {};
		try {
			result = createCourseSchema.parse(formData);
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

		const response = await createCourse(
			sessionId,
			result.name,
			result.description,
			result.durationInDays,
			result.imageUrl,
		);
		const courseId = response.Data.Course.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/courses`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/courses/${courseId}/view`,
			successMessage(`Course created successfully!`),
			event
		);
	}
};
