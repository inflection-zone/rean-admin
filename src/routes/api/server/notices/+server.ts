import type { RequestEvent } from '@sveltejs/kit';
import { deleteNotice } from '../../services/notices';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside notice server endpoints');
	let response;
	try{
		response = await deleteNotice(data.sessionId, data.noticeId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting notice.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
