import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { getWebLinkById, updateWebLink } from '$routes/api/services/careplan/assets/web-link';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const webLinkId = event.params.id;
		const response = await getWebLinkById(sessionId, webLinkId);
		const webLink = response.Data;
		return {
			webLink
		};
	} catch (error) {
		console.error(`Error retriving web link: ${error.message}`);
	}
};

const updateWebLinkSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	pathUrl: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateWebLinkAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const webLinkId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type WebLinkSchema = z.infer<typeof updateWebLinkSchema>;

		let result: WebLinkSchema = {};
		try {
			result = updateWebLinkSchema.parse(formDataValue);
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

		const response = await updateWebLink(
			sessionId,
			webLinkId,
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
			`/users/${userId}/careplan/assets/web-links/${id}/view`,
			successMessage(`Web link updated successfully!`),
			event
		);
	}
};
