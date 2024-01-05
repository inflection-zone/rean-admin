import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createCourseContent } from '../../../../../../../../api/services/course.contents';

/////////////////////////////////////////////////////////////////////////

const createContentSchema = zfd.formData({
	title: z.string().max(256),
	description: z.string().optional(),
	sequence: zfd.numeric(z.number().optional()),
	contentType: z.string(),
	resourceLink: z.string().optional(),
	imageUrl: z.string().optional(),
	durationInMins: zfd.numeric(z.number().optional())
});

export const actions = {
	createCourseContentAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const courseId = event.params.courseId;
		const moduleId = event.params.moduleId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type ContentSchema = z.infer<typeof createContentSchema>;

		let result: ContentSchema = {};
		try {
			result = createContentSchema.parse(formData);
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

		const response = await createCourseContent(
			sessionId,
			moduleId,
			result.title,
			result.description,
			result.durationInMins,
			result.sequence,
			result.contentType,
			result.resourceLink,
			result.imageUrl
		);
		const id = response.Data.CourseContent.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/courses`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${id}/view`,
			successMessage(`Content created successfully!`),
			event
		);
	}
};
