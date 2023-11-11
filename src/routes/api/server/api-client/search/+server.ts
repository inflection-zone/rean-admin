import type { RequestEvent } from '@sveltejs/kit';
import { searchApiClients } from '../../../services/api-clients';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const clientName = searchParams.get('clientName') ?? undefined;
	const clientEmail = searchParams.get('clientEmail') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			clientName: clientName,
			email: clientEmail,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage: itemsPerPage,
			pageIndex: pageIndex
		};
		const response = await searchApiClients(sessionId, searchParams);
		const items = response.Data.ApiClientRecords.Items;

		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving asset: ${err.message}`);
		return new Response(err.message);
	}
};
