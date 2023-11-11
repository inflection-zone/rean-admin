import { searchSchemas } from '$routes/api/services/gamification/schema';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;
	const searchParams: URLSearchParams = event.url.searchParams;
	const name = searchParams.get('name') ?? undefined;
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
		console.log("searchParams", searchParams);
		const response = await searchSchemas(sessionId, searchParams);
		const items = response.Data.Items;
		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving schemas: ${err.message}`);
		return new Response(err.message);
	}
};
