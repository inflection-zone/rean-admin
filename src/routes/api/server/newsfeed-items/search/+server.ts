import type { RequestEvent } from '@sveltejs/kit';
import { searchNewsfeedItems } from '../../../../api/services/newsfeed-items';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const templateId = searchParams.get('templateId') ?? undefined;
	const title = searchParams.get('title') ?? undefined;
	const description = searchParams.get('description') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('pageIndex');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 25;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			templateId,
			title,
			description,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		console.log('Search parms: ', searchParams);
		const response = await searchNewsfeedItems(sessionId, searchParams);
		const items = response.Data.RssfeedItem.Items;
    console.log(response)

		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving newsfeed items: ${err.message}`);
		return new Response(err.message);
	}
};
