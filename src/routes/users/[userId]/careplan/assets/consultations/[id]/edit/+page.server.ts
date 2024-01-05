import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getConsultationById, updateConsultation } from '$routes/api/services/careplan/assets/consultation';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  try {
    const consultationId = event.params.id;
    const response = await getConsultationById(sessionId, consultationId);
    const consultation = response.Data;
    return {
      consultation
    };
  } catch (error) {
    console.error(`Error retriving consultation: ${error.message}`);
  }
};

const updateConsultationSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	consultationType: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateConsultationAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const appointmentId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type ConsultationSchema = z.infer<typeof updateConsultationSchema>;

		let result: ConsultationSchema = {};
		try {
			result = updateConsultationSchema.parse(formDataValue);
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

		const response = await updateConsultation(
			sessionId,
			appointmentId,
			result.name,
			result.description,
			result.consultationType,
			result.tags,
			result.version
		);
		console.log(response);
		const id = response.Data.id;
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/careplan/assets`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/careplan/assets/consultations/${id}/view`,
			successMessage(`Consultation updated successfully!`),
			event
		);
	}
};