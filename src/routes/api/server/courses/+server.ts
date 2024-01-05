import type { RequestEvent } from '@sveltejs/kit';
import { deleteCourse } from '../../services/courses';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

//////////////////////////////////////////////////////////////

export const DELETE = async (event: RequestEvent) => {
	const request = event.request;
	const data = await request.json();
	console.log('Inside course server endpoints');
	let response;
	try{
		response = await deleteCourse(data.sessionId, data.courseId);
	}catch(error){
		throw redirect(
			errorMessage('Error deleting course.'), 
			event
			);
	}
	throw redirect(
		successMessage(response.Message),
		event
		);	
};
