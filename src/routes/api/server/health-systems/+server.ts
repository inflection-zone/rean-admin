import { deleteHealthSystem } from "$routes/api/services/health.systems";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log("data",data );
	try {
		console.log('Inside health system server endpoints');
		const response = await deleteHealthSystem(
            data.sessionId,
            data.healthSystemId
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting health system: ${err.message}`);
		return new Response(err.message);
	}
};
