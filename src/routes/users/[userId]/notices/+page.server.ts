import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchNotices } from '../../../api/services/notices';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchNotices(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const notice = response.Data.NoticeRecords;
		return {
			notice,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving notice: ${error.message}`);
	}
};
