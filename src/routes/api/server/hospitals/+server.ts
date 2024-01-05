import { errorMessage, successMessage } from "$lib/utils/message.utils";
import { deleteHospital } from "$routes/api/services/hospitals";
import type { RequestEvent } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
    // console.log("request----------",request);
	const data = await request.json();
	console.log("data",data );
	console.log('Inside hospital server endpoints');
	let response;
	try{
		response = await deleteHospital(
            data.sessionId,
            data.hospitalId
		);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting hospital.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
