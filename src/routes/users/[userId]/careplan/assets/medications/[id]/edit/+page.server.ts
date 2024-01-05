import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import {
	getMedicationById,
	updateMedication
} from '$routes/api/services/careplan/assets/medication';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const medicationId = event.params.id;

		const response = await getMedicationById(sessionId, medicationId);
		const medication = response.Data;
		return {
			medication
		};
	} catch (error) {
		console.error(`Error retriving medication: ${error.message}`);
	}
};

const updateMedicationSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateMedicationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const medicationId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type MedicationSchema = z.infer<typeof updateMedicationSchema>;

		let result: MedicationSchema = {};
		try {
			result = updateMedicationSchema.parse(formDataValue);
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

		const response = await updateMedication(
			sessionId,
			medicationId,
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
			`/users/${userId}/careplan/assets/medications/${id}/view`,
			successMessage(`Medication updated successfully!`),
			event
		);
	}
};
