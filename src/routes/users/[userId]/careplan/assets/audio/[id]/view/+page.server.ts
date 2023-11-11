import { getAudioById } from '$routes/api/services/careplan/assets/audio';
import type { PageServerLoad } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  console.log('sessionId', sessionId);
  try {
    const audioId = event.params.id;
    const response = await getAudioById(sessionId, audioId);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const audio = response.Data;
    const id = response.Data.id;
    return {
      location: `${id}/edit`,
      audio,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retriving audio ${error.message}`);
  }
};
