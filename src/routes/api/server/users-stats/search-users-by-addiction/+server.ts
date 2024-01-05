import type { RequestEvent } from '@sveltejs/kit';
import { getAddictionDistribution } from '$routes/api/services/statistics';

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
		const response = await getAddictionDistribution(sessionId, searchParams);
		const addictionUsers = response.Data.AddictionDistribution;
		return new Response(JSON.stringify(addictionUsers));
	} catch (err) {
		console.error(`Error retriving addiction users: ${err.message}`);
		return new Response(err.message);
	}
};
