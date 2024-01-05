import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { deleteCohort } from '$routes/api/services/cohorts';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside cohort server endpoints');
	let response;
	try{
		response = await deleteCohort(data.sessionId, data.cohortId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting cohort.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
