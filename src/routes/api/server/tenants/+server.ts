import { deleteTenant } from '$routes/api/services/tenants';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside tenant server endpoints');
		const response = await deleteTenant(data.sessionId, data.tenantId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting tenant: ${err.message}`);
		return new Response(err.message);
	}
};
