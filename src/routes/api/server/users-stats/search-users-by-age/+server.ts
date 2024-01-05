import type { RequestEvent } from '@sveltejs/kit';
import { getAgeWiseUsers } from '$routes/api/services/statistics';

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
		const response = await getAgeWiseUsers(sessionId, searchParams);
		const ageWiseUsers = response.Data.AgeWiseUsers;
		return new Response(JSON.stringify(ageWiseUsers));
	} catch (err) {
		console.error(`Error retriving age wise users: ${err.message}`);
		return new Response(err.message);
	}
};
