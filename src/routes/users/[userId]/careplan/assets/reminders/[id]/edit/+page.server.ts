import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getReminderById, updateReminder } from '$routes/api/services/careplan/assets/reminder';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const reminderId = event.params.id;
		const response = await getReminderById(sessionId, reminderId);
		const reminder = response.Data;
		return {
			reminder
		};
	} catch (error) {
		console.error(`Error retriving reminder: ${error.message}`);
	}
};

const updateReminderSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateReminderAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const reminderId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type ReminderSchema = z.infer<typeof updateReminderSchema>;

		let result: ReminderSchema = {};
		try {
			result = updateReminderSchema.parse(formDataValue);
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

		const response = await updateReminder(
			sessionId,
			reminderId,
			result.name,
			result.description,
			result.tags,
			result.version
		);
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
			`/users/${userId}/careplan/assets/reminders/${id}/view`,
			successMessage(`Reminder updated successfully!`),
			event
		);
	}
};
