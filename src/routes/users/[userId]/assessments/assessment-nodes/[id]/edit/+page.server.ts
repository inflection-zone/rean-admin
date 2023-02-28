import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	getAssessmentNodeById,
	updateAssessmentNode
} from '../../../../../../api/services/assessment-nodes';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const assessmentNodeId = event.params.id;
		console.log(assessmentNodeId);
		const response = await getAssessmentNodeById(sessionId, assessmentNodeId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessmentNode = response.Data.assessmentNode;
		console.log(assessmentNode);

		const id = response.Data.assessmentNode.id;
		return {
			location: `${id}/edit`,
			assessmentNode,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment node: ${error.message}`);
	}
};

export const actions = {
	updateAssessmentNodeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const data = await request.formData();
		console.log(data);
		const nodeType = data.has('nodeType') ? data.get('nodeType') : null;
		const title = data.has('title') ? data.get('title') : null;
		const description = data.has('description') ? data.get('description') : null;
		const queryType = data.has('queryType') ? data.get('queryType') : null;

		const sessionId = event.cookies.get('sessionId');
		console.log('sessionId', sessionId);

		const assessmentNodeId = event.params.id;
		console.log('node id', assessmentNodeId);

		const response = await updateAssessmentNode(
			sessionId,
			assessmentNodeId,
			nodeType.valueOf() as string,
			title.valueOf() as string,
			description.valueOf() as string,
			queryType.valueOf() as string
		);
		const id = response.Data.assessmentNode.id;
		console.log(response);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, '/assessments/assessment-nodes', errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/assessments/assessment-nodes/${id}/view`,
			successMessage(`assessment node updated successful!`),
			event
		);
	}
};
