import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchAssessmentTemplates } from '../../../api/services/assessment-templates';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({cookies,depends}) => {
	const sessionId = cookies.get('sessionId');
	depends('app:assessmentTemplate')
	try {
		const response = await searchAssessmentTemplates(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const assessmentTemplate = response.Data.AssessmentTemplateRecords;
		return {
			assessmentTemplate,
			sessionId,
			message: response.Message,
		};
	} catch (error) {
		console.error(`Error retriving assessment templates: ${error.message}`);
	}
};
