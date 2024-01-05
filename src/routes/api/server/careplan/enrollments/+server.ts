import { deleteEnrollment } from "$routes/api/services/careplan/enrollment";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log("data",data );
	try {
		console.log('Inside enrollment server endpoints');
		const response = await deleteEnrollment(
            data.sessionId,
            data.enrollmentId
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting enrollment: ${err.message}`);
		return new Response(err.message);
	}
};