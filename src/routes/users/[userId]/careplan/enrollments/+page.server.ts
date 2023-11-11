import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { searchEnrollments } from '$routes/api/services/careplan/enrollment';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
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
  }
};
