import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { deleteBadgeCategory } from '$routes/api/services/gamification/badge.category';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside badge category server endpoints');
	let response;
	try{
		response = await deleteBadgeCategory(data.sessionId, data.badgeCategoryId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting badge category.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};