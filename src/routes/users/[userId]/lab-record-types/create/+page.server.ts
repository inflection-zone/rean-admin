import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createLabRecordType } from '../../../../api/services/lab-record-types';

/////////////////////////////////////////////////////////////////////////

const createLabRecordSchema = zfd.formData({
	typeName: z.string().max(128),
	displayName: z.string().optional(),
	snowmedCode: z.string().optional(),
	loincCode: z.string().optional(),
	normalRangeMin: zfd.numeric(z.number().optional()),
	normalRangeMax: zfd.numeric(z.number().optional()),
	unit: z.string().optional()
});

export const actions = {
	createLabRecordTypeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type LabRecordSchema = z.infer<typeof createLabRecordSchema>;

		let result: LabRecordSchema = {};
		try {
			result = createLabRecordSchema.parse(formData);
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

		const response = await createLabRecordType(
			sessionId,
			result.typeName,
			result.displayName,
			result.snowmedCode,
			result.loincCode,
			result.normalRangeMin,
			result.normalRangeMax,
			result.unit
		);
		const id = response.Data.LabRecordType.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/lab-record-types`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/lab-record-types/${id}/view`,
			successMessage(`Lab record created successfully!`),
			event
		);
	}
};
