import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getLearningJourneyById } from '../../../../../api/services/learning-journeys';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const learningPathId = event.params.learningPathId;
		const response = await getLearningJourneyById(sessionId, learningPathId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const learningJourney = response.Data.LearningPath;
		console.log("learningJourney",learningJourney);
		const id = response.Data.LearningPath.id;
		return {
			location: `${id}/edit`,
			learningJourney,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving learning journey: ${error.message}`);
	}
};
