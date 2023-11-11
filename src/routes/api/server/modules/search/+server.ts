import type { RequestEvent } from '@sveltejs/kit';
import { page } from '$app/stores';
import { searchModules } from '../../../services/modules';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const name = searchParams.get('name') ?? undefined;
	const description = searchParams.get('description') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			name,
			Description: description,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		console.log('Search parms: ', searchParams);
		const response = await searchModules(sessionId, searchParams);
		const items = response.Data.Items;
		console.log('data==/////', response);

		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving modules: ${err.message}`);
		return new Response(err.message);
	}
};
