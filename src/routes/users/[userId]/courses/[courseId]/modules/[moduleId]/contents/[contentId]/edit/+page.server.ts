import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import {
	getCourseContentById,
	updateCourseContent
} from '../../../../../../../../../api/services/course.contents';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const contentId = event.params.contentId;
		const response = await getCourseContentById(sessionId, contentId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const content = response.Data.CourseContent;
		return {
			content
		};
	} catch (error) {
		console.error(`Error retriving content: ${error.message}`);
	}
};

const updateContentSchema = zfd.formData({
	title: z.string().max(256),
	description: z.string().optional(),
	sequence: zfd.numeric(z.number().optional()),
	contentType: z.string(),
	resourceLink: z.string().optional(),
	imageUrl: z.string().optional(),
	durationInMins: zfd.numeric(z.number().optional())
});

export const actions = {
	updateCourseContentAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const courseId = event.params.courseId;
		const moduleId = event.params.moduleId;
		const contentId = event.params.contentId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type ContentSchema = z.infer<typeof updateContentSchema>;

		let result: ContentSchema = {};
		try {
			result = updateContentSchema.parse(formData);
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

		const response = await updateCourseContent(
			sessionId,
			moduleId,
			contentId,
			result.title,
			result.description,
			result.durationInMins,
			result.sequence,
			result.contentType,
			result.resourceLink,
			result.imageUrl
		);
		const id = response.Data.CourseContent.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/courses`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/courses/${courseId}/modules/${moduleId}/contents/${id}/view`,
			successMessage(`Content updated successfully!`),
			event
		);
	}
};
