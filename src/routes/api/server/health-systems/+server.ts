import { errorMessage, successMessage } from "$lib/utils/message.utils";
import { deleteHealthSystem } from "$routes/api/services/health.systems";
import type { RequestEvent } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log("data",data );
	console.log('Inside health system server endpoints');
	let response;
	try{
		response = await deleteHealthSystem(
            data.sessionId,
            data.healthSystemId
		);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting health system.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
