import { searchHospitals } from "$routes/api/services/hospitals";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {

    const sessionId = event.locals.sessionUser.sessionId;
    const searchParams: URLSearchParams = event.url.searchParams;
    const name = searchParams.get('name') ?? undefined
    // const healthSystemName = searchParams.get('healthSystemName') ?? undefined;
    const sortBy = searchParams.get('sortBy') ?? 'CreatedAt';
    const sortOrder = searchParams.get('sortOrder') ?? 'ascending';
    const itemsPerPage_ = searchParams.get('itemsPerPage');
    const itemsPerPage = itemsPerPage_ ? parseInt(itemsPerPage_) : 10;
    const pageIndex_ = searchParams.get('pageIndex');
    const pageIndex = pageIndex_ ? parseInt(pageIndex_) : 0;

	try {
        const searchParams = {
            name,
            orderBy: sortBy,
            order: sortOrder,
            itemsPerPage,
            pageIndex,
        };
        console.log("Search parms: ", searchParams);
		const response = await searchHospitals(sessionId, searchParams);
        const hospitals = response.Data.Hospitals;
        // console.log("hospitals", JSON.stringify(hospitals, null, 2));
        return new Response(JSON.stringify(hospitals));
	} catch (err) {
		console.error(`Error retriving careplans: ${err.message}`);
		return new Response(err.message);
	}
};


