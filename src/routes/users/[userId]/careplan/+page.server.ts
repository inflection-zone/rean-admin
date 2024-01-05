import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error} from '@sveltejs/kit';
import { getCareplanStatistics } from '$routes/api/services/careplan/statistics';
import { errorMessage } from '$lib/utils/message.utils';
import { redirect } from 'sveltekit-flash-message/server';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  const userId = event.params.userId;
  console.log('sessionId', sessionId);
  try {
    const response = await getCareplanStatistics(sessionId);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const careplanStats = response.Data;
    console.log("careplanStats", careplanStats)
    return {
      careplanStats,
      sessionId,
    };
  } catch (error) {
    console.error(`Error retriving statistic data: ${error.message}`);
    throw redirect(303,`/users/${userId}/home`,errorMessage('Error retriving statistic data'), event) 
  }
};
