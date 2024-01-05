import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	getCarePlanActivityById,
	updateCarePlanActivity
} from '$routes/api/services/careplan/scheduling';
import { getTimeSlots } from '$routes/api/services/types';
import { getAssetsType } from '$routes/api/services/careplan/assets/asset';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log(`session id received - ${sessionId}`);
	try {
		const careplanActivityId = event.params.activityId;
		const careplanActivitiy_ = await getCarePlanActivityById(sessionId, careplanActivityId);
		const careplanActivitiy = careplanActivitiy_.Data;
		console.log(careplanActivitiy);
		const assetTypes = await getAssetsType(sessionId);
		const timeslot = await getTimeSlots();
		return {
			careplanActivitiy,
			assetTypes,
			timeslot,
			sessionId
		};
	} catch (error) {
		console.error(`Error retriving careplan activity data : ${error.message}`);
	}
};

const updateCarePlanActivitySchema = zfd.formData({
	assetType: z.string().max(128),
	carePlanId: z.string().optional(),
	assetId: z.string().optional(),
	day: zfd.numeric(z.number().optional()),
	timeSlot: z.string().optional()
});

export const actions = {
	updateCarePlanActivityAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const carePlanId = event.params.careplanId;
		const careplanActivityId = event.params.activityId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		type CarePlanActivitySchema = z.infer<typeof updateCarePlanActivitySchema>;

		let result: CarePlanActivitySchema = {};
		try {
			result = updateCarePlanActivitySchema.parse(formData);
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

		const response = await updateCarePlanActivity(
			sessionId,
			careplanActivityId,
			result.assetType,
			result.assetId,
			carePlanId,
			result.day,
			result.timeSlot
		);
		const id = response.Data.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(
				303,
				`/users/${userId}/careplan/careplans/${carePlanId}/scheduling`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/careplan/careplans/${carePlanId}/scheduling/${id}/view`,
			successMessage(`Careplan activity updated successfully!`),
			event
		);
	}
};
