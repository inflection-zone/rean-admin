import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { getMessageById, updateMessage } from '$routes/api/services/careplan/assets/message';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  try {
    const messageId = event.params.id;
    const response = await getMessageById(sessionId, messageId);
    const msg = response.Data;
    return {
      msg
    };
  } catch (error) {
    console.error(`Error retriving message: ${error.message}`);
  }
};

const updateMessageSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	messageType: z.string().optional(),
  pathUrl: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateMessageAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
    const messageId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type MessageSchema = z.infer<typeof updateMessageSchema>;

		let result: MessageSchema = {};
		try {
			result = updateMessageSchema.parse(formDataValue);
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

		const response = await updateMessage(
			sessionId,
      messageId,
			result.name,
			result.description,
			result.messageType,
			result.tags,
      result.pathUrl,
			result.version
		);
		const id = response.Data.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/careplan/assets`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/careplan/assets/messages/${id}/view`,
			successMessage(`Message updated successfully!`),
			event
		);
	}
};
