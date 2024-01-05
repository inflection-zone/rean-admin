import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getNewsfeedById, updateNewsfeed } from '../../../../../api/services/newsfeeds';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const newsfeedId = event.params.newsfeedId;
		const response = await getNewsfeedById(sessionId, newsfeedId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const newsfeed = response.Data.Rssfeed;
		return {
			sessionId,
			newsfeed
		};
	} catch (error) {
		console.error(`Error retriving newsfeed: ${error.message}`);
	}
};

const updateNewsfeedSchema = zfd.formData({
	title: z.string().max(256),
	description: z.string().optional(),
	category: z.string().optional(),
	link: z.string().optional(),
	language: z.string(),
	copyright: z.string().optional(),
	favicon: z.string().optional(),
	image: z.string().optional(),
	tags: z.array(z.string())
});

export const actions = {
	updateNewsfeedAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const newsfeedId = event.params.newsfeedId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type NewsfeedSchema = z.infer<typeof updateNewsfeedSchema>;

		let result: NewsfeedSchema = {};
		try {
			result = updateNewsfeedSchema.parse(formDataValue);
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

		const response = await updateNewsfeed(
			sessionId,
			newsfeedId,
			result.title,
			result.description,
			result.category,
			result.link,
			result.language,
			result.copyright,
			result.favicon,
			result.image,
			result.tags
		);
		const id = response.Data.Rssfeed.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/newsfeeds`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/newsfeeds/${id}/view`,
			successMessage(`Newsfeed updated successfully!`),
			event
		);
	}
};
