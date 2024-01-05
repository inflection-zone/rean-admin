import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchAssessmentNodes } from '../../../../../api/services/assessment-nodes';
import { getAssessmentTemplateById } from '../../../../../api/services/assessment-templates';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const assessmentTemplateId = event.params.templateId;
		const searchParams = {
			templateId: assessmentTemplateId
		};
		const response = await getAssessmentTemplateById(sessionId, assessmentTemplateId);
		const _assessmentNodes = await searchAssessmentNodes(sessionId, searchParams);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessmentTemplate = response.Data.AssessmentTemplate;
		const assessmentNodes = _assessmentNodes.Data.AssessmentNodeRecords.Items;
		const id = response.Data.AssessmentTemplate.id;
		console.log("assessmentTemplate", assessmentTemplate)
		return {
			location: `${id}/edit`,
			assessmentTemplate,
			assessmentNodes,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving assessment template: ${error.message}`);
	}
};
