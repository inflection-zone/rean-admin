import * as cookie from 'cookie';
import type { PageServerLoad, Action } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';
import { getApiClientById } from '../../../../../api/services/api-clients';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	console.log('sessionId', sessionId);

	try {
		const apiclientId = event.params.id;
		console.log(apiclientId);
		const response = await getApiClientById(sessionId, apiclientId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const apiClient = response.Data;
		console.log('api client', apiClient);
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			apiClient,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving api client: ${error.message}`);
	}
};