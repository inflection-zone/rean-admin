import type { RequestEvent } from '@sveltejs/kit';
import { deleteNewsfeed } from '../../services/newsfeeds';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside newsfeed server endpoints');
	let response;
	try{
		response = await deleteNewsfeed(data.sessionId, data.newsfeedId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting newsfeed.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
