import { searchEventTypes } from '$routes/api/services/gamification/event.types';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	console.log("searchParams",searchParams)
	const name = searchParams.get('name') ?? undefined;
	console.log("Name",name);
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			name: name,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage: itemsPerPage,
			pageIndex: pageIndex
		};
		const response = await searchEventTypes(sessionId, searchParams);
		const items = response.Data.Items;
		console.log("items",items)
		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving event types: ${err.message}`);
		return new Response(err.message);
	}
};
