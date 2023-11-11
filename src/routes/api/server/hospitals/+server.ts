import { deleteHospital } from "$routes/api/services/hospitals";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
    // console.log("request----------",request);
	const data = await request.json();
	console.log("data",data );
	try {
		console.log('Inside hospital server endpoints');
		const response = await deleteHospital(
            data.sessionId,
            data.hospitalId
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting hospital: ${err.message}`);
		return new Response(err.message);
	}
};
