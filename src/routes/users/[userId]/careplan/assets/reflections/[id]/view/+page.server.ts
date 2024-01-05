import { getReflectionById } from '$routes/api/services/careplan/assets/reflection';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const reflectionId = event.params.id;
		const response = await getReflectionById(sessionId, reflectionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const reflection = response.Data;
		const id = response.Data.id;
		return {
			location: `${id}/edit`,
			reflection,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retrieving reflection: ${error.message}`);
		throw redirect(303, '/');
	}
};
