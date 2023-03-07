import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNewsfeedItem } from '../../../../../api/services/newsfeed-items';

/////////////////////////////////////////////////////////////////////////

export const actions = {
	createNewsfeedItemAtion: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();

		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const newsfeed = data.has('newsfeed') ? data.get('newsfeed') : null;
		const type = data.has('type') ? data.get('type') : null;
		const link = data.has('link') ? data.get('link') : null;
		const author = data.has('author') ? data.get('author') : null;
		const date = data.has('date') ? data.get('date') : null;
		const sessionId = event.cookies.get('sessionId');

		const response = await createNewsfeedItem(
			sessionId,
			title.valueOf() as string,
			description.valueOf() as string,
			newsfeed.valueOf() as string,
			type.valueOf() as string,
			link.valueOf() as string,
			author.valueOf() as string,
			date.valueOf() as Date
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, '/newsfeeds/newsfeed-items', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/newsfeeds/newsfeed-items/${id}/view`,
			successMessage(`Newsfeed item created successful!`),
			event
		);
	}
};