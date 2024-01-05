import type { RequestEvent } from '@sveltejs/kit';
import { getGenderWiseUsers } from '$routes/api/services/statistics';

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
		const response = await getGenderWiseUsers(sessionId, searchParams);
		const genderWiseUsers = response.Data.GenderWiseUsers;
		return new Response(JSON.stringify(genderWiseUsers));
	} catch (err) {
		console.error(`Error retriving gender wise users: ${err.message}`);
		return new Response(err.message);
	}
};
