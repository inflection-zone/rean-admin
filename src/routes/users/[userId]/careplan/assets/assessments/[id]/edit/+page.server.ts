import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getAssessmentById, updateAssessment } from '$routes/api/services/careplan/assets/assessment';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  try {
    const assessmentId = event.params.id;
    const response = await getAssessmentById(sessionId, assessmentId);
		console.log("response", response);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const assessment = response.Data;
    return {
      assessment
    };
  } catch (error) {
    console.error(`Error retriving assessment: ${error.message}`);
  }
};

const updateAssessmentSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
  template: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateAssessmentAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
    const assessmentId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type AssessmentSchema = z.infer<typeof updateAssessmentSchema>;

		let result: AssessmentSchema = {};
		try {
			result = updateAssessmentSchema.parse(formDataValue);
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

		const response = await updateAssessment(
			sessionId,
      assessmentId,
			result.name,
			result.description,
      result.template,
			result.tags,
			result.version
		);
    const id = response.Data.id;

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw redirect(303, `/users/${userId}/careplan/assets`, errorMessage(response.Message), event);
    }
    throw redirect(
      303,
      `/users/${userId}/careplan/assets/assessments/${id}/view`,
      successMessage(`Assessment updated successfully!`),
      event
    );
  }
};
