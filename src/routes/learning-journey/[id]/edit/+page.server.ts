import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	getlearningJourneyById,
	updatelearningJourney
} from '../../../api/services/learning-journey';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const learningJourneyId = event.params.id;
		console.log(learningJourneyId);
		const response = await getlearningJourneyById(sessionId, learningJourneyId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const learningJourney = response.Data;
		console.log('learning journey', learningJourney);
		return {
			learningJourney
		};
	} catch (error) {
		console.error(`Error retriving learning journey: ${error.message}`);
	}
};

export const actions = {
	updatelearningJourney: async (event: RequestEvent) => {
		const request = event.request;
		const data = await request.formData();
		const name = data.has('name') ? data.get('name') : null;
		const preferenceWeight = data.has('preferenceWeight') ? data.get('preferenceWeight') : null;
		const description = data.has('description') ? data.get('description') : null;
		const image = data.has('image') ? data.get('image') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);
		const learningJourneyId = event.params.id;
		console.log('goal categories management id', learningJourneyId);

		const response = await updatelearningJourney(
			sessionId,
			learningJourneyId,
			name.valueOf() as string,
			preferenceWeight.valueOf() as number,
			description.valueOf() as string,
			image.valueOf() as File
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/admin-panel', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/learning-journey/${id}/view`,
			successMessage(`learning journey updated successful!`),
			event
		);
	}
};