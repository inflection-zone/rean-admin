import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getAssessmentNodeById } from '../../../../../../api/services/assessment-nodes';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const assessmentNodeId = event.params.id;
		//console.log('knowid=====', knowledgeNuggetsId);
		const response = await getAssessmentNodeById(sessionId, assessmentNodeId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessmentNode = response.Data.assessmentNode;
		console.log('assessmentNode====', assessmentNode);
		//const id = response.Data.id;
		const id = response.Data.assessmentNode.id;
		//console.log('id====', id);
		return {
			location: `${id}/edit`,
			assessmentNode,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment node: ${error.message}`);
	}
};
