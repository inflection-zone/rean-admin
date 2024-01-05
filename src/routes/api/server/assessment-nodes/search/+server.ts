import type { RequestEvent } from '@sveltejs/kit';
import { searchAssessmentNodes } from '../../../../api/services/assessment-nodes';

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {
	const sessionId = event.locals.sessionUser.sessionId;

	const searchParams: URLSearchParams = event.url.searchParams;
	const templateId = searchParams.get('templateId') ?? undefined;
	const title = searchParams.get('title') ?? undefined;
	const nodeType = searchParams.get('nodeType') ?? undefined;
	const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
	const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
	const itemsPerPage_ = searchParams.get('itemsPerPage');
	const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
	const pageIndex_ = searchParams.get('pageIndex');
	const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
		const searchParams = {
			templateId,
			title,
			nodeType,
			orderBy: sortBy,
			order: sortOrder,
			itemsPerPage,
			pageIndex
		};
		console.log('Search parms: ', searchParams);
		const response = await searchAssessmentNodes(sessionId, searchParams);
		const items = response.Data.AssessmentNodeRecords.Items;

		return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving assessment node: ${err.message}`);
		return new Response(err.message);
	}
};
