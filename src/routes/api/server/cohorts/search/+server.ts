import type { RequestEvent } from '@sveltejs/kit';
import { searchCohorts } from '../../../services/cohorts';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const tenantId = searchParams.get('tenantId') ?? undefined;
	const name = searchParams.get('name') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			tenantId,
			name,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		console.log('Search parms: ', searchParams);
		const response = await searchCohorts(sessionId, searchParams);
		const items = response.Data.Cohorts.Items;
		console.log('res==', response);

		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving cohorts: ${err.message}`);
		return new Response(err.message);
	}
};
