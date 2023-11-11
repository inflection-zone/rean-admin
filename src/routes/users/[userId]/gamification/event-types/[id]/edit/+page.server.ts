import type { PageServerLoad } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getEventTypeById, updateEventType } from '$routes/api/services/gamification/event.types';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const eventTypeId = event.params.id;
		const response = await getEventTypeById(sessionId, eventTypeId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const eventType = response.Data;
		const id = eventType.id;
		return {
			location: `${id}/edit`,
			eventType,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving event type: ${error.message}`);
	}
};

const updateEventTypeSchema = zfd.formData({
	name: z.string().min(1).max(32),
	description: z.string().optional()
});

export const actions = {
	updateEventTypeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const eventTypeId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type EventTypeSchema = z.infer<typeof updateEventTypeSchema>;

		let result: EventTypeSchema = {};
		try {
			result = updateEventTypeSchema.parse(formData);
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

		const response = await updateEventType(
			sessionId,
			eventTypeId,
			result.name,
			result.description
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(
				303,
				`/users/${userId}/gamification/event-types`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/gamification/event-types/${id}/view`,
			successMessage(`event type updated successfully!`),
			event
		);
	}
};
