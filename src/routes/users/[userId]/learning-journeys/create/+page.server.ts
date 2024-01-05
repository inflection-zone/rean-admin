import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { createLearningJourney } from '../../../../api/services/learning-journeys';
import { searchCourses } from '../../../../api/services/courses';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);
	try {
		const response = await searchCourses(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const courses = response.Data.Courses.Items;
		console.log('courses', courses);
		return {
			courses,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving courses: ${error.message}`);
	}
};

const createLearningJourneySchema = zfd.formData({
	name: z.string().max(256),
	preferenceWeight: zfd.numeric(z.number().optional()),
	description: z.string().optional(),
	durationInDays: zfd.numeric(z.number().optional()),
	imageUrl: z.string().optional(),
	courseIds: z.array(z.string()).optional(),
});

export const actions = {
	createLearningJourneyAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		
		const courseIds = data.has('courseIds') ? data.getAll('courseIds'): [];
	
		const formDataValue = { ...formData, courseIds: courseIds };

		type LearningJourneySchema = z.infer<typeof createLearningJourneySchema>;

		let result: LearningJourneySchema = {};
		try {
			result = createLearningJourneySchema.parse(formDataValue);
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

		const courses = result.courseIds.map(x => x.split(','));
		const flattenedArray = courses.flat();
		const updatedData = { "CourseIds": flattenedArray }

		const response = await createLearningJourney(
			sessionId,
			result.name,
			result.preferenceWeight,
			result.description,
			result.durationInDays,
			result.imageUrl,
			updatedData.CourseIds,
		);
		console.log('response', response.Data);
		const learningPathId = response.Data.LearningPath.id;
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/learning-journeys`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/learning-journeys/${learningPathId}/view`,
			successMessage(`Learning journey created successfully!`),
			event
		);
	}
};
