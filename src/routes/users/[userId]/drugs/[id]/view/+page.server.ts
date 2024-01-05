import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDrugById } from '../../../../../api/services/drugs';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const drugId = event.params.id;
		const response = await getDrugById(sessionId, drugId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const drug = response.Data.Drug;
		const id = response.Data.Drug.id;
		return {
			location: `${id}/edit`,
			drug,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving drug: ${error.message}`);
	}
};
