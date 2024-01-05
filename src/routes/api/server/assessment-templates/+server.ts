import type { RequestEvent } from '@sveltejs/kit';
import { deleteAssessmentTemplate } from '../../services/assessment-templates';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside assessment template server endpoints');
	let response;
	try{
		response = await deleteAssessmentTemplate(
			data.sessionId, 
			data.assessmentTemplateId
			);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting assessment template.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
