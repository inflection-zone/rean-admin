import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getBadgeCategoryById, updateBadgeCategory } from '$routes/api/services/gamification/badge.category';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

////////////////////////////////////////////////////////////////////////////

 export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const badgeCategoryId = event.params.id;
		const response = await getBadgeCategoryById(sessionId, badgeCategoryId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const badgeCategory = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			badgeCategory,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving badge category: ${error.message}`);
	}
};

const updateBadgeCategorySchema = zfd.formData({
	name: z.string().min(1).max(32),
	description: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const actions = {
	updateBadgeCategoryAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
    const badgeCategoryId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type BadgeCategorySchema = z.infer<typeof updateBadgeCategorySchema>;

		let result: BadgeCategorySchema = {};
		try {
			result = updateBadgeCategorySchema.parse(formData);
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

		const response = await updateBadgeCategory(sessionId, badgeCategoryId, result.name, result.description, result.imageUrl);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
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
			successMessage(`Badge category updated successfully!`),
			event
		);
	}
}