
import { searchEnrollmentTask } from "$routes/api/services/careplan/enrollment.task";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {

    const sessionId = event.locals.sessionUser.sessionId;
    
    const searchParams: URLSearchParams = event.url.searchParams;
    const assetType = searchParams.get('assetType') ?? undefined;
    const scheduledDate = searchParams.get('scheduledDate') ?? undefined;
    const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
    const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
    const itemsPerPage_ = searchParams.get('itemsPerPage');
    const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
    const pageIndex_ = searchParams.get('pageIndex');
    const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;
    console.log("assetType",assetType);

	try {	
        const searchParams = {
            assetType,
            scheduledDate,
            orderBy: sortBy,
            order: sortOrder,
            itemsPerPage,
            pageIndex, 
        };
        console.log("Search parms--------: ", searchParams);
		const response = await searchEnrollmentTask(sessionId, searchParams);
        const items = response.Data.Items;

        return new Response(JSON.stringify(items));
	} catch (err) {
		console.error(`Error retriving Enrollments-task: ${err.message}`);
		return new Response(err.message);
	}
};

