import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getLabRecordTypeById } from '../../../../../api/services/lab-record-types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const labRecordTypeId = event.params.id;
		const response = await getLabRecordTypeById(sessionId, labRecordTypeId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const labRecordType = response.Data.LabRecordType;
		const id = response.Data.LabRecordType.id;
		return {
			location: `${id}/edit`,
			labRecordType,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving lab record type: ${error.message}`);
	}
};
