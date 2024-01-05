import type { RequestEvent } from '@sveltejs/kit';
import { deleteModule } from '../../services/modules';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

	try {
		console.log('Inside module server endpoints');
		const response = await deleteModule(data.sessionId, data.moduleId);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting module: ${err.message}`);
		return new Response(err.message);
	}
};
