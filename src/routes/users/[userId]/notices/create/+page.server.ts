import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createNotice } from '../../../../api/services/notices';

/////////////////////////////////////////////////////////////////////////

const createNoticeSchema = zfd.formData({
	title: z.string().max(256),
	description: z.string().optional(),
	link: z.string().optional(),
	daysActive: zfd.numeric(z.number().optional()),
	tags: z.array(z.string()).optional(),
	action: z.string().optional(),
	imageUrl: z.string().optional()
});

export const actions = {
	createNoticeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type NoticeSchema = z.infer<typeof createNoticeSchema>;

		let result: NoticeSchema = {};
		try {
			result = createNoticeSchema.parse(formDataValue);
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

		const response = await createNotice(
			sessionId,
			result.title,
			result.description,
			result.link,
			result.daysActive,
			result.tags,
			result.action,
			result.imageUrl
		);
		const id = response.Data.Notice.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/notices`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/notices/${id}/view`,
			successMessage(`Notice created successfully!`),
			event
		);
	}
};
