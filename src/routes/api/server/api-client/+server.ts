import type { RequestEvent } from '@sveltejs/kit';
import { deleteApiClient } from '../../services/api-clients';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside api client server endpoints');
	let response;
	try{
		response = await deleteApiClient(data.sessionId, data.apiClientId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting api-client.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
