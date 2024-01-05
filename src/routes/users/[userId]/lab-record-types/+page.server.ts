import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchLabRecordTypes } from '../../../api/services/lab-record-types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async ({cookies,depends}) => {
	const sessionId = cookies.get('sessionId');
	depends('app:labRecordType')
	let labRecordTypes=[]
	try {
		const response = await searchLabRecordTypes(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		labRecordTypes = response.Data.LabRecordTypes;
		return {
			labRecordTypes,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving Lab record types: ${error.message}`);
		return {
			labRecordTypes,
			sessionId,
			message: error.message
		};
	}
};
