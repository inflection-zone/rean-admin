import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getSchemaById, updateSchema } from '$routes/api/services/gamification/schema';
import { searchEventTypes } from '$routes/api/services/gamification/event.types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const schemaId = event.params.schemaId;
		const response = await getSchemaById(sessionId, schemaId);
		const _eventTypes = await searchEventTypes(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const schema = response.Data;
		const eventTypes = _eventTypes.Data.Items;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			schema,
			eventTypes,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving schema : ${error.message}`);
	}
};

const updateSchemaSchema = zfd.formData({
	name: z.string().min(1).max(32),
	description: z.string().optional(),
	type: z.string().optional(),
  eventTypeIds: z.array(z.string()).optional(),
});

export const actions = {
	updateSchemaAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const schemaId = event.params.schemaId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		
		const eventTypeIds = data.has('eventTypeIds') ? data.getAll('eventTypeIds'): [];
	
		const formDataValue = { ...formData, eventTypeIds: eventTypeIds };
		console.log("formDataValue",formDataValue)

		type Schema = z.infer<typeof updateSchemaSchema>;

		let result: Schema = {};
		try {
			result = updateSchemaSchema.parse(formDataValue);
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
		console.log("updatedData", updatedData.EventTypeIds);
		const response = await updateSchema(
			sessionId,
			schemaId,
			result.name,
			result.description,
			result.type,
      updatedData.EventTypeIds
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
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
			successMessage(`Schema updated successfully!`),
			event
		);
	}
};
