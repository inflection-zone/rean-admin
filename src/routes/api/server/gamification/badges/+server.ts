import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { deleteBadge } from '$routes/api/services/gamification/badge';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside badge server endpoints');
	let response;
	try{
		response = await deleteBadge(data.sessionId, data.badgeId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting badge.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
