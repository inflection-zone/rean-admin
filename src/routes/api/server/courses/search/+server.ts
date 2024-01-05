import type { RequestEvent } from '@sveltejs/kit';
import { page } from '$app/stores';
import { searchCourses } from '../../../services/courses';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const name = searchParams.get('name') ?? undefined;
	const durationInDays = searchParams.get('durationInDays') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			name,
			durationInDays: durationInDays,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		console.log('Search parms: ', searchParams);
		const response = await searchCourses(sessionId, searchParams);
		const items = response.Data.Courses.Items;

		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving courses: ${err.message}`);
		return new Response(err.message);
	}
};
