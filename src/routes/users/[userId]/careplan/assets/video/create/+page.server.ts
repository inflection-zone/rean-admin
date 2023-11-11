import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { createVideo } from '$routes/api/services/careplan/assets/video';

/////////////////////////////////////////////////////////////////////////

const createVideoSchema = zfd.formData({
	name: z.string().max(128),
	transcript: z.string().optional(),
	pathUrl: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	createVideoAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type VideoSchema = z.infer<typeof createVideoSchema>;

		let result: VideoSchema = {};
		try {
			result = createVideoSchema.parse(formDataValue);
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

		const response = await createVideo(
			sessionId,
			result.name,
			result.transcript,
			result.pathUrl,
			result.tags,
			result.version
		);
		const id = response.Data.id;
		console.log(response);

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/careplan/assets`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/careplan/assets/video/${id}/view`,
			successMessage(`Video created successfully!`),
			event
		);
	}
};
