import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createLearningJourney } from '../../../../api/services/learning-journeys';
import { error } from '@sveltejs/kit';
import { searchCourses } from '../../../../api/services/courses';
import type { PageServerLoad } from '../$types';

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
    console.log("courses",courses);
    return {
      courses,
      sessionId,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving courses: ${error.message}`);
  }
};

export const actions = {
	createLearningJourneyAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
		console.log("data",data);
		const name = data.has('name') ? data.get('name') : null;
		const preferenceWeight = data.has('preferenceWeight') ? data.get('preferenceWeight') : null;
		const description = data.has('description') ? data.get('description') : null;
		const imageUrl = data.has('imageUrl') ? data.get('imageUrl') : null;
		const courseIds = data.has('courseIds') ? data.getAll('courseIds') : null;
		console.log("courses",courseIds);
		// const courses = values.getAll("ice-cream-flavors") as string[];
		const sessionId = event.cookies.get('sessionId');

		const response = await createLearningJourney(
			sessionId,
			name.valueOf() as string,
			preferenceWeight.valueOf() as number,
			description.valueOf() as string,
			imageUrl.valueOf() as string,
			courseIds.valueOf() as string[]
		);
		console.log("response",response.Data);
		const learningPathId = response.Data.LearningPath.id;
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/learning-journeys', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/learning-journeys/${learningPathId}/view`,
			successMessage(`learning journey created successful!`),
			event
		);
	}
};
