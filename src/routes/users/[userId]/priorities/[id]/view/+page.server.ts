import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getPriorityById } from '../../../../../api/services/priorities';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const priorityId = event.params.id;
		console.log(priorityId);
		const response = await getPriorityById(sessionId, priorityId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const priority = response.Data;
		console.log('priority', priority);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			priority,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving priority: ${error.message}`);
	}
};