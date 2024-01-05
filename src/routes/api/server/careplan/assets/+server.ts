
import { errorMessage, successMessage } from "$lib/utils/message.utils";
import { deleteAsset } from "$routes/api/services/careplan/assets/action-plan";
import type { RequestEvent } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
    console.log("request----------",request);
	const data = await request.json();
    console.log("data----------",data);
	console.log('Inside assets server endpoints');
	let response;
	try{
		response = await deleteAsset(
            data.sessionId,
            data.selectAsset,
            data.assetId,
		);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting asset.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};