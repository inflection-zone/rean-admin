import type { RequestEvent } from '@sveltejs/kit';
import { deleteLearningJourney } from '../../services/learning-journeys';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside learning journey server endpoints');
	let response;
	try{
		response = await deleteLearningJourney(data.sessionId, data.symptomId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting learning journey.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
