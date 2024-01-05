import type { RequestEvent } from '@sveltejs/kit';
import { deletePriority } from '../../services/priorities';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside priority server endpoints');
	let response;
	try{
		response = await deletePriority(data.sessionId, data.priorityId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting priority.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
