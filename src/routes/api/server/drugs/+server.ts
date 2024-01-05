import type { RequestEvent } from '@sveltejs/kit';
import { deleteDrug } from '../../services/drugs';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside drug server endpoints');
	let response;
	try{
		response = await deleteDrug(data.sessionId, data.drugId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting drug.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
