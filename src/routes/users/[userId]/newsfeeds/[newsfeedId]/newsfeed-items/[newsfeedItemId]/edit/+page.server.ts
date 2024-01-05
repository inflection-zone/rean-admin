import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import {
	getNewsfeedItemById,
	updateNewsfeedItem
} from '../../../../../../../api/services/newsfeed-items';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const newsfeedItemId = event.params.newsfeedItemId;
		const response = await getNewsfeedItemById(sessionId, newsfeedItemId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const newsfeedItem = response.Data.RssfeedItem;
		return {
			newsfeedItem
		};
	} catch (error) {
		console.error(`Error retriving newsfeed -Items: ${error.message}`);
	}
};

const updateNewsfeedItemSchema = zfd.formData({
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
	updateNewsfeedItemAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const newsfeedId = event.params.newsfeedId;
		const newsfeedItemId = event.params.newsfeedItemId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type NewsfeedsItemSchema = z.infer<typeof updateNewsfeedItemSchema>;

		let result: NewsfeedsItemSchema = {};
		try {
			result = updateNewsfeedItemSchema.parse(formData);
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

		const response = await updateNewsfeedItem(
			sessionId,
			newsfeedItemId,
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
		const id = response.Data.RssfeedItem.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/newsfeeds`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/newsfeeds/${newsfeedId}/newsfeed-items/${id}/view`,
			successMessage(`Newsfeed item updated successfully!`),
			event
		);
	}
};
