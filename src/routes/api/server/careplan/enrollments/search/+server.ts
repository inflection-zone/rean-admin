import { searchEnrollments } from "$routes/api/services/careplan/enrollment";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {

    const sessionId = event.locals.sessionUser.sessionId;
    
    const searchParams: URLSearchParams = event.url.searchParams;
    const careplanId = searchParams.get('carePlan') ?? undefined;
    if (careplanId){
      const pattern = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$', 'i');
        if (pattern.test(careplanId) === false) {
            return new Response(JSON.stringify([]));
        }
    }
    const displayId = searchParams.get('displayId') ?? undefined;
    const startDate = searchParams.get('startDate') ?? undefined;
    const endDate = searchParams.get('endDate') ?? undefined;
    const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
    const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
    const itemsPerPage_ = searchParams.get('itemsPerPage');
    const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
    const pageIndex_ = searchParams.get('pageIndex');
    const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {	
        const searchParams = {
            careplanId,
            displayId,
            startDate,
            endDate,
            orderBy: sortBy,
            order: sortOrder,
            itemsPerPage,
            pageIndex, 
        };
       
        const response = await searchEnrollments(sessionId, searchParams);
        return new Response(JSON.stringify(response.Data.Items));
      
	} catch (err) {
		console.error(`Error retriving Enrollments: ${err.message}`);
		return new Response(err.message);
	}
};

