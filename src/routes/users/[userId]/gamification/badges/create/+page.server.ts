import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createBadge } from '$routes/api/services/gamification/badge';
import { searchBadgeCategories } from '$routes/api/services/gamification/badge.category';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchBadgeCategories(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const badgeCategories = response.Data.Items;
		return {
			badgeCategories,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving badge categories: ${error.message}`);
	}
};

const createBadgeSchema = zfd.formData({
	categoryId: z.string(),
	name: z.string().min(1).max(32),
	description: z.string().optional(),
	imageUrl: z.string().optional()
});

export const actions = {
	createBadgeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type BadgeSchema = z.infer<typeof createBadgeSchema>;

		let result: BadgeSchema = {};
		try {
			result = createBadgeSchema.parse(formData);
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

		const response = await createBadge(
			sessionId,
			result.categoryId,
			result.name,
			result.description,
			result.imageUrl
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/gamification/badges`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/gamification/badges/${id}/view`,
			successMessage(`Badge created successfully!`),
			event
		);
	}
};
