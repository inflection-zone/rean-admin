import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createAssessmentTemplate } from '../../../../api/services/assessment-templates';

/////////////////////////////////////////////////////////////////////////

const createAssessmentTemplateSchema = zfd.formData({
	title: z.string().min(3).max(256),
	description: z.string().optional(),
	type: z.string(),
	provider: z.string().optional(),
	providerAssessmentCode: z.string().optional(),
	serveListNodeChildrenAtOnce: zfd.checkbox(),
	scoringApplicable: zfd.checkbox()
});

export const actions = {
	createAssessmentAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type AssessmentTemplateSchema = z.infer<typeof createAssessmentTemplateSchema>;

		let result: AssessmentTemplateSchema = {};
		try {
			result = createAssessmentTemplateSchema.parse(formData);
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

		const response = await createAssessmentTemplate(
			sessionId,
			result.title,
			result.description,
			result.type,
			result.provider,
			result.providerAssessmentCode,
			result.serveListNodeChildrenAtOnce,
			result.scoringApplicable
		);

		const id = response.Data.AssessmentTemplate.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/assessment-templates`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/assessment-templates/${id}/view`,
			successMessage(`Assessment template created successfully!`),
			event
		);
	}
};
