import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { deleteQuery } from '$routes/api/services/custom.query';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside query server endpoints');
	let response;
	try{
		response = await deleteQuery(data.sessionId, data.queryId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting query.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
