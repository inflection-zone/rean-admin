import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNewsfeed } from '../../../../api/services/newsfeeds';

/////////////////////////////////////////////////////////////////////////

const createNewsfeedSchema = zfd.formData({
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
	createNewsfeedAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type NewsfeedSchema = z.infer<typeof createNewsfeedSchema>;

		let result: NewsfeedSchema = {};
		try {
			result = createNewsfeedSchema.parse(formDataValue);
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
		
		const response = await createNewsfeed(
			sessionId,
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
		const newsfeedId = response.Data.Rssfeed.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/newsfeeds`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/newsfeeds/${newsfeedId}/view`,
			successMessage(`Newsfeed created successfully!`),
			event
		);
	}
};
