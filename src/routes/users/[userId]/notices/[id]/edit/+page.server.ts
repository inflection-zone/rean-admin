import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getNoticeById, updateNotice } from '../../../../../api/services/notices';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const linkageId = event.params.id;
		const response = await getNoticeById(sessionId, linkageId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const notice = response.Data.Notice;
		const id = response.Data.Notice.id;
		return {
			location: `${id}/edit`,
			notice,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving notice: ${error.message}`);
	}
};

const updateNoticeSchema = zfd.formData({
	title: z.string().max(256),
	description: z.string().optional(),
	link: z.string().optional(),
	daysActive: zfd.numeric(z.number().optional()),
	tags: z.array(z.string()).optional(),
	action: z.string().optional(),
	imageUrl: z.string().optional()
});

export const actions = {
	updateNoticeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const linkageId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type NoticeSchema = z.infer<typeof updateNoticeSchema>;

		let result: NoticeSchema = {};
		try {
			result = updateNoticeSchema.parse(formDataValue);
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

		const response = await updateNotice(
			sessionId,
			linkageId,
			result.title,
			result.description,
			result.link,
			result.daysActive,
			result.tags,
			result.action,
			result.imageUrl
		);
		const id = response.Data.Notice.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/notices`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/notices/${id}/view`,
			successMessage(`Notice updated successfully!`),
			event
		);
	}
};
