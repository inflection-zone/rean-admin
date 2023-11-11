import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getBadgeById, updateBadge } from '$routes/api/services/gamification/badge';
import { searchBadgeCategories } from '$routes/api/services/gamification/badge.category';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const badgeId = event.params.id;
		const response = await getBadgeById(sessionId, badgeId);
		const _badgeCategories = await searchBadgeCategories(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const badge = response.Data;
		const badgeCategories = _badgeCategories.Data.Items;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			badge,
			badgeCategories,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving badge : ${error.message}`);
	}
};

const updateBadgeSchema = zfd.formData({
	categoryId: z.string(),
	name: z.string().min(1).max(32),
	description: z.string().optional(),
	imageUrl: z.string().optional()
});

export const actions = {
	updateBadgeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const badgeId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type BadgeSchema = z.infer<typeof updateBadgeSchema>;

		let result: BadgeSchema = {};
		try {
			result = updateBadgeSchema.parse(formData);
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

		const response = await updateBadge(
			sessionId,
			badgeId,
			result.categoryId,
			result.name,
			result.description,
			result.imageUrl
		);
		const id = response.Data.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
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
			successMessage(`Badge updated successfully!`),
			event
		);
	}
};
