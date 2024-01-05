import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import {
	getLearningJourneyById,
	updateLearningJourney
} from '../../../../../api/services/learning-journeys';
import { searchCourses } from '../../../../../api/services/courses';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const learningJourneyId = event.params.learningPathId;
		const courses_ = await searchCourses(sessionId);
		const response = await getLearningJourneyById(sessionId, learningJourneyId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const learningJourney = response.Data.LearningPath;
		const courses = courses_.Data.Courses.Items;
		return {
			learningJourney,
			courses
		};
	} catch (error) {
		console.error(`Error retriving learning journey: ${error.message}`);
	}
};

const updateLearningJourneySchema = zfd.formData({
	name: z.string().max(256),
	preferenceWeight: zfd.numeric(z.number().optional()),
	description: z.string().optional(),
	durationInDays: zfd.numeric(z.number().optional()),
	imageUrl: z.string().optional(),
	courseIds: z.array(z.string()).optional(),
});

export const actions = {
	updateLearningJourneyAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const learningJourneyId = event.params.learningPathId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const courseIds = data.has('courseIds') ? data.getAll('courseIds') : [];
		const formDataValue = { ...formData, courseIds: courseIds };

		type LearningJourneySchema = z.infer<typeof updateLearningJourneySchema>;

		let result: LearningJourneySchema = {};
		try {
			result = updateLearningJourneySchema.parse(formDataValue);
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

		const response = await updateLearningJourney(
			sessionId,
			learningJourneyId,
			result.name,
			result.preferenceWeight,
			result.description,
			result.durationInDays,
			result.imageUrl,
			updatedData.CourseIds,
		);
		const learningPathId = response.Data.LearningPath.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
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
			successMessage(`Learning journey updated successfully!`),
			event
		);
	}
};
