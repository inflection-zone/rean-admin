import type { RequestEvent } from '@sveltejs/kit';
import { deletePersonRoleType } from '../../services/person-role-types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside person role type server endpoints');
	let response;
	try{
		response = await deletePersonRoleType(data.sessionId, data.personRoleTypeId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting person role type.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
