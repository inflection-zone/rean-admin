import type { RequestEvent } from '@sveltejs/kit';
import { getCountryWiseUsers } from '$routes/api/services/statistics';

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
		const response = await getCountryWiseUsers(sessionId, searchParams);
		const countryWiseUsers = response.Data.CountryWiseUsers;
		return new Response(JSON.stringify(countryWiseUsers));
	} catch (err) {
		console.error(`Error retriving country wise users: ${err.message}`);
		return new Response(err.message);
	}
};
