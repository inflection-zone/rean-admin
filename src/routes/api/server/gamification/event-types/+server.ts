import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { deleteEventType } from '$routes/api/services/gamification/event.types';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside event type server endpoints');
	let response;
	try{
		response = await deleteEventType(data.sessionId, data.eventTypeId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting event type.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};