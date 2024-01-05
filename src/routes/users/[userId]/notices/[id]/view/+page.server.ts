import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getNoticeById } from '../../../../../api/services/notices';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const linkageId = event.params.id;
		const response = await getNoticeById(sessionId, linkageId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const notice = response.Data.Notice;
		const id = response.Data.Notice.id;
		return {
			location: `${id}/edit`,
			notice,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving notice: ${error.message}`);
	}
};
