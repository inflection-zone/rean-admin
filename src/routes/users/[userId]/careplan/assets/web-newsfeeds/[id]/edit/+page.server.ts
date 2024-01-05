import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import {
	getWebNewsfeedById,
	updateWebNewsfeed
} from '$routes/api/services/careplan/assets/web-newsfeed';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const webNewsfeedId = event.params.id;
		const response = await getWebNewsfeedById(sessionId, webNewsfeedId);
		const webNewsfeed = response.Data;

		return {
			webNewsfeed
		};
	} catch (error) {
		console.error(`Error retriving word power: ${error.message}`);
	}
};

const updateWebNewsfeedSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	pathUrl: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateWebNewsfeedAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const webNewsfeedId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type WebNewsfeedSchema = z.infer<typeof updateWebNewsfeedSchema>;

		let result: WebNewsfeedSchema = {};
		try {
			result = updateWebNewsfeedSchema.parse(formDataValue);
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

		const response = await updateWebNewsfeed(
			sessionId,
			webNewsfeedId,
			result.name,
			result.description,
			result.pathUrl,
			result.tags,
			result.version
		);
		console.log(response);
		const id = response.Data.id;
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(
				303,
				`/users/${userId}/careplan/assets`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/careplan/assets/web-newsfeeds/${id}/view`,
			successMessage(`Web newsfeed updated successfully!`),
			event
		);
	}
};
