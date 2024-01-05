import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { createMessage } from '$routes/api/services/careplan/assets/message';

/////////////////////////////////////////////////////////////////////////

const createMessageSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	messageType: z.string().optional(),
  pathUrl: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	createMessageAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type MessageSchema = z.infer<typeof createMessageSchema>;

		let result: MessageSchema = {};
		try {
			result = createMessageSchema.parse(formDataValue);
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

		const response = await createMessage(
			sessionId,
			result.name,
			result.description,
			result.messageType,
			result.tags,
      result.pathUrl,
			result.version
		);
		const id = response.Data.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/careplan/assets`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/careplan/assets/messages/${id}/view`,
			successMessage(`Message created successfully!`),
			event
		);
	}
};
