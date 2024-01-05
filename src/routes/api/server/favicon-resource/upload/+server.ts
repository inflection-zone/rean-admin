import { uploadBinary } from '../../../services/file.resource';
import type { RequestEvent, RequestHandler } from './$types';
import * as fs from 'fs';

//////////////////////////////////////////////////////////////

export const POST = (async (event: RequestEvent) => {
	try {
		console.log(`Upload in progress---`);

		console.log(JSON.stringify(event, null, 2));

		const data_ = await event.request.json();
		const params: URLSearchParams = event.url.searchParams;
		console.log(`search params : ` + params);
		const faviconName = event.request.headers.get('faviconName');
		console.log(faviconName);

		const fileBuffer = data_['favicon'];
		const filePath = faviconName;
		fs.writeFileSync(filePath, fileBuffer, 'base64');

		if (fs.existsSync(filePath)) {
			console.log(Date.now().toString());
			console.log(`Copied file ${faviconName} to server stats/temp.`);
		}

		const sessionId = event.locals.sessionUser.sessionId;
		const buffer = fs.readFileSync(filePath);

		console.log('Uploading file resource ...');
		const response = await uploadBinary(sessionId, buffer, faviconName, true);
		console.log(JSON.stringify(response, null, 2));

		fs.unlinkSync(filePath);

		return new Response(JSON.stringify(response));
	} catch (err) {
		console.error(`Error uploading file: ${JSON.stringify(err.stack.split('\n'), null, 2)}`);
		return new Response(err.message);
	}
}) satisfies RequestHandler;
