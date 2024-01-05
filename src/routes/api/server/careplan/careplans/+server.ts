import { errorMessage, successMessage } from "$lib/utils/message.utils";
import { deleteCareplan } from "$routes/api/services/careplan/careplans";
import type { RequestEvent } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
    const request = event.request;
    console.log("request----------",request);
    const data = await request.json();
    console.log("data",data );
    console.log('Inside careplan server endpoints');
    let response;
	try{
		response = await deleteCareplan(
            data.sessionId,
            data.careplanId
        );
	}catch(error){
		throw redirect(
			errorMessage('Error deleting careplan.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
