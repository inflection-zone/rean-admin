import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createLearningJourney } from '../../../../api/services/learning-journeys';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createLearningJourneyAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const name = data.has('name') ? data.get('name') : null;
		const preferenceWeight = data.has('preferenceWeight') ? data.get('preferenceWeight') : null;
		const description = data.has('description') ? data.get('description') : null;
		const image = data.has('image') ? data.get('image') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createLearningJourney(
			sessionId,
			name.valueOf() as string,
			preferenceWeight.valueOf() as number,
			description.valueOf() as string,
			image.valueOf() as File
		);
		const id = response.Data.LearningJourney.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/learning-journeys', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/learning-journeys/${id}/view`,
			successMessage(`learning journey created successful!`),
			event
		);
	}
};
