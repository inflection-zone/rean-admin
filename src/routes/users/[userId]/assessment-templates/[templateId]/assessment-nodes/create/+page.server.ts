import { redirect } from 'sveltekit-flash-message/server';
import { error, type RequestEvent } from '@sveltejs/kit';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import {
	addScoringCondition,
	createAssessmentNode,
	getQueryResponseTypes,
	searchAssessmentNodes
} from '../../../../../../api/services/assessment-nodes';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const templateId = event.params.templateId;
		const searchParams = {
			templateId: templateId
		};
		const _queryResponseTypes = await getQueryResponseTypes(sessionId);
		const response = await searchAssessmentNodes(sessionId, searchParams);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const queryResponseTypes = _queryResponseTypes.Data.QueryResponseTypes;
		const assessmentNodes = response.Data.AssessmentNodeRecords.Items;

		return {
			queryResponseTypes,
			assessmentNodes,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving query response types: ${error.message}`);
	}
};

const createAssessmentNodeSchema = zfd.formData({
	nodeType: z.string(),
	parentNodeId: z.string().uuid(),
	title: z.string().min(8).max(256),
	description: z.string().optional(),
	sequence: zfd.numeric(z.number().optional()),
	queryType: z.string().optional(),
	resolutionScore: zfd.numeric(z.number().default(1)),
	providerAssessmentCode: z.string().optional(),
	message: z.string().optional(),
	serveListNodeChildrenAtOnce: zfd.checkbox({ trueValue: 'true' }),
	scoringApplicable: zfd.checkbox({ trueValue: 'true' }),
	options: z.array(z.string())
});

export const actions = {
	createAssessmentNodeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const templateId = event.params.templateId;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const options = data.has('options') ? data.getAll('options') : [];
		const formData = Object.fromEntries(data);
		const formDataValue = { ...formData, options: options };

		type AssessmentNodeSchema = z.infer<typeof createAssessmentNodeSchema>;

		let result: AssessmentNodeSchema = {};
		try {
			result = createAssessmentNodeSchema.parse(formDataValue);
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

		const response = await createAssessmentNode(
			sessionId,
			templateId,
			result.parentNodeId,
			result.nodeType,
			result.title,
			result.description,
			result.message,
			result.serveListNodeChildrenAtOnce,
			result.queryType,
			result.options,
			result.sequence,
		);

		const nodeId = response.Data.AssessmentNode.id;

		const scoringCondition = await addScoringCondition(
			sessionId,
			templateId,
			nodeId,
			result.resolutionScore
		);

		console.log('scoringCondition', scoringCondition);

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
			`/users/${userId}/assessment-templates/${templateId}/assessment-nodes/${nodeId}/view`,
			successMessage(`Assessment node created successfully!`),
			event
		);
	}
};
