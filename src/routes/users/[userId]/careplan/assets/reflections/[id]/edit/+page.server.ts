import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import {
	getReflectionById,
	updateReflection
} from '$routes/api/services/careplan/assets/reflection';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const reflectionId = event.params.id;

		const response = await getReflectionById(sessionId, reflectionId);
		const reflection = response.Data;
		console.log('reflection', reflection);
		return {
			reflection
		};
	} catch (error) {
		console.error(`Error retriving reflection: ${error.message}`);
	}
};

const updateReflectionSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateReflectionAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const reflectionId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type ReflectionSchema = z.infer<typeof updateReflectionSchema>;

		let result: ReflectionSchema = {};
		try {
			result = updateReflectionSchema.parse(formDataValue);
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

		const response = await updateReflection(
			sessionId,
			reflectionId,
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
			`/users/${userId}/careplan/assets/reflections/${id}/view`,
			successMessage(`Reflection updated successfully!`),
			event
		);
	}
};
