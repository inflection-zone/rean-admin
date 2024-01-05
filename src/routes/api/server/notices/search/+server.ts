import type { RequestEvent } from '@sveltejs/kit';
import { page } from '$app/stores';
import { searchNotices } from '../../../services/notices';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const title = searchParams.get('title') ?? undefined;
	const daysActive = searchParams.get('daysActive') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 25;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			title,
			daysActive,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		console.log('Search parms: ', searchParams);
		const response = await searchNotices(sessionId, searchParams);
		const items = response.Data.NoticeRecords.Items;

		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving notices: ${err.message}`);
		return new Response(err.message);
	}
};
