import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createSchema } from '$routes/api/services/gamification/schema';

/////////////////////////////////////////////////////////////////////////

const createSchemas = zfd.formData({
	name: z.string().min(1).max(32),
	description: z.string().optional(),
	type: z.string().optional(),
  eventTypeIds: z.array(z.string()).optional(),
});

export const actions = {
	createSchemaAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		
		const eventTypeIds = data.has('eventTypeIds') ? data.getAll('eventTypeIds'): [];
	
		const formDataValue = { ...formData, eventTypeIds: eventTypeIds };

		type Schema = z.infer<typeof createSchemas>;

		let result: Schema = {};
		try {
			result = createSchemas.parse(formDataValue);
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
    const eventTypes = result.eventTypeIds.map(x => x.split(','));
		const flattenedArray = eventTypes.flat();
		const updatedData = { "EventTypeIds": flattenedArray }

		const response = await createSchema(
			sessionId,
			result.name,
			result.description,
			result.type,
      updatedData.EventTypeIds,
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/gamification/schemas`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/gamification/schemas/${id}/view`,
			successMessage(`Schema created successfully!`),
			event
		);
	}
};
