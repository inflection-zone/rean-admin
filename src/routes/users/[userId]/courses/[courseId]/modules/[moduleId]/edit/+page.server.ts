import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getModuleById, updateModule } from '../../../../../../../api/services/modules';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const moduleId = event.params.moduleId;
		const response = await getModuleById(sessionId, moduleId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const module = response.Data.CourseModule;
		return {
			module
		};
	} catch (error) {
		console.error(`Error retriving module: ${error.message}`);
	}
};

const updateModuleSchema = zfd.formData({
	name: z.string().max(256),
	description: z.string().optional(),
	durationInMins: zfd.numeric(z.number().optional()),
	imageUrl: z.string().optional(),
	sequence: zfd.numeric(z.number().optional()),
});

export const actions = {
	updateModuleAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const courseId = event.params.courseId;
		const moduleId = event.params.moduleId;
		const formData = Object.fromEntries(await request.formData());

		type ModuleSchema = z.infer<typeof updateModuleSchema>;

		let result: ModuleSchema = {};
		try {
			result = updateModuleSchema.parse(formData);
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

		const response = await updateModule(
			sessionId,
			moduleId,
			courseId,
			result.name,
			result.description,
			result.durationInMins,
			result.imageUrl,
			result.sequence
		);
		const id = response.Data.CourseModule.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/courses`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/courses/${courseId}/modules/${id}/view`,
			successMessage(`Module updated successfully!`),
			event
		);
	}
};
