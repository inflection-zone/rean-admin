import { redirect } from 'sveltekit-flash-message/server';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNewsfeedItem } from '../../../../../../api/services/newsfeed-items';
import type { RequestEvent } from './$types';

/////////////////////////////////////////////////////////////////////////

const createNewsfeedItemSchema = zfd.formData({
	title: z.string().max(256),
	description: z.string().optional(),
	link: z.string().optional(),
	content: z.string(),
	authorName: z.string().optional(),
	authorEmail: z.string().optional(),
	authorLink: z.string().optional(),
	image: z.string().optional()
});

export const actions = {
	createNewsfeedItemAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const newsfeedId = event.params.newsfeedId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type NewsfeedsItemSchema = z.infer<typeof createNewsfeedItemSchema>;

		let result: NewsfeedsItemSchema = {};
		try {
			result = createNewsfeedItemSchema.parse(formData);
			console.log('result', result);
		} catch (err: any) {
			const { fieldErrors: errors } = err.flatten();
			console.log(errors);
			const { ...rest } = formData;
			return {
				data: rest,
				errors
			};
		}

		const response = await createNewsfeedItem(
			sessionId,
			newsfeedId,
			result.title,
			result.description,
			result.link,
			result.content,
			result.authorName,
			result.authorEmail,
			result.authorLink,
			result.image
		);
		const newsfeedItemId = response.Data.RssfeedItem.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/newsfeeds`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items/${newsfeedItemId}/view`,
			successMessage(`Newsfeed item created successfully!`),
			event
		);
	}
};
