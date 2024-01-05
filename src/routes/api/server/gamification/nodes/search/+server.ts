import { searchNodes } from '$routes/api/services/gamification/node';
import type { RequestEvent } from '@sveltejs/kit';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;
	const searchParams: URLSearchParams = event.url.searchParams;
  const schemaId = searchParams.get('schemaId') ?? undefined;
	console.log("searchParams",searchParams)
	const name = searchParams.get('name') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;
	console.log("Name",name);
	try {
		const searchParams = {
      schemaId:schemaId,
			name: name,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage: itemsPerPage,
			pageIndex: pageIndex
		};
		const response = await searchNodes(sessionId, searchParams);
		const items = response.Data.Items;
    console.log("items",items)
		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving nodes: ${err.message}`);
		return new Response(err.message);
	}
};
