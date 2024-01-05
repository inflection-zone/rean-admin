import { getCheckupById } from '$routes/api/services/careplan/assets/checkup';
import type { PageServerLoad } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  try {
    const checkupId = event.params.id;
    const response = await getCheckupById(sessionId, checkupId);
    console.log( response);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const checkup = response.Data;
    return {
      checkup
    };
  } catch (error) {
    console.error(`Error retriving checkup: ${error.message}`);
  }
};
