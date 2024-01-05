import type { RequestEvent } from '@sveltejs/kit';
import { deleteSymptom } from '../../services/symptoms';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside symptom server endpoints');
	let response;
	try{
		response = await deleteSymptom(data.sessionId, data.symptomId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting symptom.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
