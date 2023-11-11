import type { RequestEvent } from '@sveltejs/kit';
import { searchOrganizations } from '../../../services/organizations';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const type = searchParams.get('type') ?? undefined;
	const name = searchParams.get('name') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			type: type,
			name: name,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage: itemsPerPage,
			pageIndex: pageIndex
		};
		const response = await searchOrganizations(sessionId, searchParams);
		const items = response.Data.Organizations.Items;
		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving asset: ${err.message}`);
		return new Response(err.message);
	}
};
