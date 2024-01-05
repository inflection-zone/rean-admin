import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { deleteTenant } from '$routes/api/services/tenants';
import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside tenant server endpoints');
	let response;
	try{
		response = await deleteTenant(data.sessionId, data.tenantId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting tenant.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
