import type { RequestEvent } from '@sveltejs/kit';
import { deleteGoal } from '../../services/goals';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside goal server endpoints');
	let response;
	try{
		response =await deleteGoal(data.sessionId, data.goalId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting goal.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
