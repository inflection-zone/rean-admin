import { deleteFileResource } from '../../../services/file.resource';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();

  console.log('daat>>-',data)

	try {
		console.log('Inside server endpoints');
		const response = await deleteFileResource(data.sessionId, data.resourceId);
		console.log('res---==',response)
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting Image: ${err.message}`);
		return new Response(err.message);
	}
};
