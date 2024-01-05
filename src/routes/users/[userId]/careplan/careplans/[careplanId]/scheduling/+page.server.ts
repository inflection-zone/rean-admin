import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { getCareplanById, searchCareplanCategories } from '$routes/api/services/careplan/careplans';
import { createCarePlanActivity, searchCarePlanActivities } from '$routes/api/services/careplan/scheduling';
import { getAssetsType } from '$routes/api/services/careplan/assets/asset';
import { getTimeSlots } from '$routes/api/services/types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log(`session id received - ${sessionId}`);

  try {
    const careplanId = event.params.careplanId;
    const searchParams = {
      careplanId:careplanId 
    }
    const careplan = await getCareplanById(sessionId, careplanId);
    const response = await searchCarePlanActivities(sessionId, searchParams);
    const careplanActivities = response.Data.Items;
    const assetTypes = await getAssetsType(sessionId);
    const timeslot = await getTimeSlots();

    const _careplanCategories = await searchCareplanCategories(sessionId);
    const careplanCategories = _careplanCategories.Data.Items;
    return {
      careplanActivities,
      assetTypes,
      careplanCategories,
      careplan,
      timeslot,
      sessionId
    };
  } catch (error) {
    console.error(`Error retriving data: ${error.message}`);
  }
};

const createCarePlanActivitySchema = zfd.formData({
	assetType: z.string().max(128),
	carePlanId: z.string().optional(),
  assetId: z.string().optional(),
	day: zfd.numeric(z.number().optional()),
	timeSlot: z.string().optional()
});

export const actions = {
	createCarePlanActivityAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
    const carePlanId = event.params.careplanId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		type CarePlanActivitySchema = z.infer<typeof createCarePlanActivitySchema>;

		let result: CarePlanActivitySchema = {};
		try {
			result = createCarePlanActivitySchema.parse(formData);
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

		const response = await createCarePlanActivity(
			sessionId,
      result.assetType,
      result.assetId,
			carePlanId,
			result.day,
			result.timeSlot,
		);
		const careplanActivityId = response.Data.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/careplan/careplans/${carePlanId}/scheduling`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/careplan/careplans/${carePlanId}/scheduling/${careplanActivityId}/view`,
			successMessage(`Careplan activity created successfully!`),
			event
		);
	}
};
