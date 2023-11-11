
import { deleteAsset } from "$routes/api/services/careplan/assets/action-plan";
import type { RequestEvent } from "@sveltejs/kit";

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
    console.log("request----------",request);
	const data = await request.json();
    console.log("data----------",data);
	try {
		console.log('Inside assets server endpoints');
		const response = await deleteAsset(
            data.sessionId,
            data.selectAsset,
            data.assetId,
		);
		return new Response(response.message);
	} catch (err) {
		console.error(`Error deleting asset: ${err.message}`);
		return new Response(err.message);
	}
};