
import { deleteCarePlanActivity } from "$routes/api/services/careplan/scheduling";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
    console.log("request----------",request);
	const data = await request.json();
	console.log("data",data );
	try {
		console.log('Inside careplan activity server endpoints');
		const response = await deleteCarePlanActivity(
            data.sessionId,
            data.careplanActivityId,
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting careplan activity: ${err.message}`);
		return new Response(err.message);
	}
};