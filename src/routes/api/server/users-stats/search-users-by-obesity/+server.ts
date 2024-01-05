import type { RequestEvent } from '@sveltejs/kit';
import { getObesityDistribution } from '$routes/api/services/statistics';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const year = searchParams.get('year') ?? undefined;

	try {
		const searchParams = {
			year: year
		};
		console.log('Search parms: ', searchParams);
		const response = await getObesityDistribution(sessionId, searchParams);
		const obesityUsers = response.Data.ObesityDistribution;
		return new Response(JSON.stringify(obesityUsers));
	} catch (err) {
		console.error(`Error retriving obesity users: ${err.message}`);
		return new Response(err.message);
	}
};
