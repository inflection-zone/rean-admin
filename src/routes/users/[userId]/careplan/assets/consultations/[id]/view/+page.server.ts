import { getConsultationById } from '$routes/api/services/careplan/assets/consultation';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  try {
    const consultationId = event.params.id;
    const response = await getConsultationById(sessionId, consultationId);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const consultation = response.Data;
    const id = response.Data.id;
    return {
      location: `${id}/edit`,
      consultation,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving consultation: ${error.message}`);
    throw redirect(303, '/');
  }
};
