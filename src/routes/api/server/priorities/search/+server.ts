import type { RequestEvent } from '@sveltejs/kit';
import { page } from '$app/stores';
import { searchPriorities } from '../../../services/priorities';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const type = searchParams.get('type') ?? undefined;
	const tags = searchParams.get('tags') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('pageIndex');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 25;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			type,
			tags,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		console.log('Search parms: ', searchParams);
		const response = await searchPriorities(sessionId, searchParams);
		const items = response.Data.Items;
		console.log('data==/////', response);

		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving priority: ${err.message}`);
		return new Response(err.message);
	}
};
