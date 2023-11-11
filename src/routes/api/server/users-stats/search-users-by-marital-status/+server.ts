import type { RequestEvent } from '@sveltejs/kit';
import { getMaritalStatusWiseUsers } from '$routes/api/services/statistics';

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
		const response = await getMaritalStatusWiseUsers(sessionId, searchParams);
		const usersByMaritalStatus = response.Data.MaritalStatusWiseUsers;
		return new Response(JSON.stringify(usersByMaritalStatus));
	} catch (err) {
		console.error(`Error retriving users by marital status : ${err.message}`);
		return new Response(err.message);
	}
};
