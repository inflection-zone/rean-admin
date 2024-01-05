import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error} from '@sveltejs/kit';
import { searchEnrollments } from '$routes/api/services/careplan/enrollment';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const userId = event.params.userId;
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);
  try {
    const response = await searchEnrollments(sessionId);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const enrollments = response.Data;
    return {
      enrollments,
      sessionId,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving enrollments: ${error.message}`);
    throw redirect(303,`/users/${userId}/home`,errorMessage('Error retriving enrollments'), event) 
  }
};
