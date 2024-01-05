import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { createMedication } from '$routes/api/services/careplan/assets/medication';
/////////////////////////////////////////////////////////////////////////

const createMedicationSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	createMedicationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type MedicationSchema = z.infer<typeof createMedicationSchema>;

		let result: MedicationSchema = {};
		try {
			result = createMedicationSchema.parse(formDataValue);
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

		const response = await createMedication(
			sessionId,
			result.name,
			result.description,
			result.tags,
			result.version
		);
		const id = response.Data.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
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
			successMessage(`Medication created successfully!`),
			event
		);
	}
};
