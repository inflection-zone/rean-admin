import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createEventType } from '$routes/api/services/gamification/event.types';

/////////////////////////////////////////////////////////////////////////

const createEventSchema = zfd.formData({
	name: z.string().min(1).max(32),
	description: z.string().optional()
});

export const actions = {
	createEventTypeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type EventSchema = z.infer<typeof createEventSchema>;

		let result: EventSchema = {};
		try {
			result = createEventSchema.parse(formData);
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

		const response = await createEventType(sessionId, result.name, result.description);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
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
			successMessage(`Event type created successfully!`),
			event
		);
	}
};