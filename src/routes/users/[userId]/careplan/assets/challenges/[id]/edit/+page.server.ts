import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { getChallengeById, updateChallenge } from '$routes/api/services/careplan/assets/challenge';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  try {
    const challengeId = event.params.id;
    const response = await getChallengeById(sessionId, challengeId);
    const challenge = response.Data;
    return {
      challenge
    };
  } catch (error) {
    console.error(`Error retriving challenge: ${error.message}`);
  }
};

const updateChallengeSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateChallengeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
    const actionPlanId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type ChallengeSchema = z.infer<typeof updateChallengeSchema>;

		let result: ChallengeSchema = {};
		try {
			result = updateChallengeSchema.parse(formDataValue);
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

		const response = await updateChallenge(
			sessionId,
      actionPlanId,
			result.name,
			result.description,
			result.tags,
			result.version
		);
    const id = response.Data.id;

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw redirect(303, `/users/${userId}/careplan/assets`, errorMessage(response.Message), event);
    }
    throw redirect(
      303,
      `/users/${userId}/careplan/assets/challenges/${id}/view`,
      successMessage(`Challenge updated successfully!`),
      event
    );
  }
};
