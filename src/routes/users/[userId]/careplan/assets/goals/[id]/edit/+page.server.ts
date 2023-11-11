import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getGoalById, updateGoal } from '$routes/api/services/careplan/assets/goal';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const goalId = event.params.id;
		const response = await getGoalById(sessionId, goalId);
		const goal = response.Data;
		return {
			goal
		};
	} catch (error) {
		console.error(`Error retriving goal: ${error.message}`);
	}
};

const updateGoalSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateGoalAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const goalId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type GoalSchema = z.infer<typeof updateGoalSchema>;

		let result: GoalSchema = {};
		try {
			result = updateGoalSchema.parse(formDataValue);
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

		const response = await updateGoal(
			sessionId,
			goalId,
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
			`/users/${userId}/careplan/assets/goals/${id}/view`,
			successMessage(`Goal updated successfully!`),
			event
		);
	}
};
