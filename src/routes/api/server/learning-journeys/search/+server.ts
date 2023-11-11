import type { RequestEvent } from '@sveltejs/kit';
import { page } from '$app/stores';
import { searchLearningJourneys } from '../../../services/learning-journeys';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const name = searchParams.get('name') ?? undefined;
	const preferenceWeight = searchParams.get('preferenceWeight') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			name,
			preferenceWeight: preferenceWeight,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		console.log('Search parms: ', searchParams);
		const response = await searchLearningJourneys(sessionId, searchParams);
		const items = response.Data.LearningPaths.Items;

		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving learning journeys: ${err.message}`);
		return new Response(err.message);
	}
};
