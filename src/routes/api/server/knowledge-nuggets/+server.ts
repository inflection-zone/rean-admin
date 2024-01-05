import type { RequestEvent } from '@sveltejs/kit';
import { deleteKnowledgeNugget } from '../../services/knowledge-nuggets';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside knowledge nugget server endpoints');
	let response;
	try{
		response = await deleteKnowledgeNugget(data.sessionId, data.knowledgeNuggetId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting knowledge nugget.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
