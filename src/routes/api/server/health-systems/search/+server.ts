import { searchHealthSystems } from "$routes/api/services/health.systems";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const GET = async (event: RequestEvent) => {

    const sessionId = event.locals.sessionUser.sessionId;
    const searchParams: URLSearchParams = event.url.searchParams;
    const name = searchParams.get('name') ?? undefined
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
		const response = await searchHealthSystems(sessionId, searchParams);
        const healthSystems = response.Data.HealthSystems;
        console.log("healthSystems", JSON.stringify(healthSystems, null, 2));
        return new Response(JSON.stringify(healthSystems));
	} catch (err) {
		console.error(`Error retriving health systems: ${err.message}`);
		return new Response(err.message);
	}
};
