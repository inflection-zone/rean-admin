import type { RequestEvent } from '@sveltejs/kit';
import { getCurrentApiKey } from '../../../services/api-clients';

//////////////////////////////////////////////////////////////

export const POST = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	try {
		console.log('Inside get api key endpoints');
		const response = await getCurrentApiKey(data.clientCode, data.userName, data.password);
		const apiKeyDetails = response.Data.ApiKeyDetails;
		return new Response(JSON.stringify(apiKeyDetails));
	} catch (err) {
		console.error(`Error retriving api key: ${err.message}`);
		return new Response(err.message);
	}
};
