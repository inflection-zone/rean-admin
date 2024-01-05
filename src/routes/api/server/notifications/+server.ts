import type { RequestEvent } from '@sveltejs/kit';
import { deleteNotification } from '../../services/notifications';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside notification server endpoints');
	let response;
	try{
		response = await deleteNotification(data.sessionId, data.notificationId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting notification.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
