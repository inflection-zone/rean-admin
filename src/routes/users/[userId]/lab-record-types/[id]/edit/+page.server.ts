import type { PageServerLoad } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	getLabRecordTypeById,
	updateLabRecordType
} from '../../../../../api/services/lab-record-types';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const labRecordTypeId = event.params.id;
		const response = await getLabRecordTypeById(sessionId, labRecordTypeId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const labRecordType = response.Data.LabRecordType;
		const id = response.Data.LabRecordType.id;
		return {
			location: `${id}/edit`,
			labRecordType,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving goals: ${error.message}`);
	}
};

const updateLabRecordSchema = zfd.formData({
	typeName: z.string().max(128),
	displayName: z.string().optional(),
	snowmedCode: z.string().optional(),
	loincCode: z.string().optional(),
	normalRangeMin: zfd.numeric(z.number().optional()),
	normalRangeMax: zfd.numeric(z.number().optional()),
	unit: z.string().optional()
});

export const actions = {
	updateLabRecordTypeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const labRecordTypeId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type LabRecordSchema = z.infer<typeof updateLabRecordSchema>;

		let result: LabRecordSchema = {};
		try {
			result = updateLabRecordSchema.parse(formData);
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

		const response = await updateLabRecordType(
			sessionId,
			labRecordTypeId,
			result.typeName,
			result.displayName,
			result.snowmedCode,
			result.loincCode,
			result.normalRangeMin,
			result.normalRangeMax,
			result.unit
		);
		const id = response.Data.LabRecordType.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
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
			successMessage(`Lab record updated successfully!`),
			event
		);
	}
};
