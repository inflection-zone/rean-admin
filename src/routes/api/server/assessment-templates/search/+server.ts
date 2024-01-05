import type { RequestEvent } from '@sveltejs/kit';
import { page } from '$app/stores';
import { searchAssessmentTemplates } from '../../../services/assessment-templates';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const title = searchParams.get('title') ?? undefined;
	const type = searchParams.get('type') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			title,
			type: type,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		console.log('Search parms: ', searchParams);
		const response = await searchAssessmentTemplates(sessionId, searchParams);
		const items = response.Data.AssessmentTemplateRecords.Items;

		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving assessment templates: ${err.message}`);
		return new Response(err.message);
	}
};
