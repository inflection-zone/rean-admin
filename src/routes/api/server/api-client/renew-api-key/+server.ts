import type { RequestEvent } from '@sveltejs/kit';
import { updateApiKey } from '../../../services/api-clients';

//////////////////////////////////////////////////////////////

export const POST = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	try {
		console.log('Inside renew api key endpoints');
		const response = await updateApiKey(
			data.clientCode,
			data.userName,
			data.password,
			data.validFrom,
			data.validTill
		);
		const apiKeyDetails = response.Data.ApiKeyDetails;
		return new Response(JSON.stringify(apiKeyDetails));
	} catch (err) {
		console.error(`Error updating api key: ${err.message}`);
		return new Response(err.message);
	}
};
