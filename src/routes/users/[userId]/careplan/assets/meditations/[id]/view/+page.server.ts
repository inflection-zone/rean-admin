import { getMeditationById } from '$routes/api/services/careplan/assets/meditation';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  try {
    const meditationId = event.params.id;
    const response = await getMeditationById(sessionId, meditationId);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const meditation = response.Data;
    const id = response.Data.id;
    return {
      location: `${id}/edit`,
      meditation,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retrieving meditation: ${error.message}`);
    throw redirect(303, '/');
  }
};
