import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createBadgeCategory } from '$routes/api/services/gamification/badge.category.js';

/////////////////////////////////////////////////////////////////////////

const createBadgeCategorySchema = zfd.formData({
	name: z.string().min(1).max(32),
	description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const actions = {
	createBadgeCategoryAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type BadgeCategorySchema = z.infer<typeof createBadgeCategorySchema>;

		let result: BadgeCategorySchema = {};
		try {
			result = createBadgeCategorySchema.parse(formData);
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

		const response = await createBadgeCategory(sessionId, result.name, result.description, result.imageUrl);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/gamification/badge-categories`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/gamification/badge-categories/${id}/view`,
			successMessage(`Badge category created successfully!`),
			event
		);
	}
};