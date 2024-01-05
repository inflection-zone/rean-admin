import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { deleteSchema } from '$routes/api/services/gamification/schema';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside schema server endpoints');
	let response;
	try{
		response = await deleteSchema(data.sessionId, data.schemaId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting schema.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};