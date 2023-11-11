import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createModule } from '../../../../../../api/services/modules';

/////////////////////////////////////////////////////////////////////////

const createModuleSchema = zfd.formData({
	name: z.string().max(256),
	description: z.string().optional(),
	durationInMins: zfd.numeric(z.number().optional()),
	imageUrl: z.string().optional(),
	sequence: zfd.numeric(z.number().optional()),
});

export const actions = {
	createModuleAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const courseId = event.params.courseId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type ModuleSchema = z.infer<typeof createModuleSchema>;

		let result: ModuleSchema = {};
		try {
			result = createModuleSchema.parse(formData);
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

		const response = await createModule(
			sessionId,
			courseId,
			result.name,
			result.description,
			result.durationInMins,
			result.imageUrl,
			result.sequence
		);
		const id = response.Data.CourseModule.id;
		console.log('response', response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/courses`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/courses/${courseId}/modules/${id}/view`,
			successMessage(`Module created successfully!`),
			event
		);
	}
};
