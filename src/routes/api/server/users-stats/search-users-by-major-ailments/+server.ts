import type { RequestEvent } from '@sveltejs/kit';
import { getAgeWiseUsers, getMajorAilment } from '$routes/api/services/statistics';

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
		const response = await getMajorAilment(sessionId, searchParams);
		const majorAilmentUsers = response.Data.MajorAilmentDistribution;
		return new Response(JSON.stringify(majorAilmentUsers));
	} catch (err) {
		console.error(`Error retriving major ailment users: ${err.message}`);
		return new Response(err.message);
	}
};
