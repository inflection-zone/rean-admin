import { deleteCareplan } from "$routes/api/services/careplan/careplans";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
    const request = event.request;
    console.log("request----------",request);
    const data = await request.json();
    console.log("data",data );
    try {
        console.log('Inside careplan server endpoints');
        const response = await deleteCareplan(
            data.sessionId,
            data.careplanId
        );
        return new Response(response.message);
    } catch (err) {
        console.error(`Error deleting careplan: ${err.message}`);
        return new Response(err.message);
    }
};
