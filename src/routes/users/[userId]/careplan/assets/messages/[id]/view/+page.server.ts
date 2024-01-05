import { getMessageById } from '$routes/api/services/careplan/assets/message';
import type { PageServerLoad } from './$types';
import { error, redirect, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  try {
    const messageId = event.params.id;
    const response = await getMessageById(sessionId, messageId);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const msg = response.Data;
    const id = response.Data.id;
    return {
      location: `${id}/edit`,
      msg,
      message: response.Message
    };
  } catch (error) {
    console.error(`Error retrieving message: ${error.message}`);
    throw redirect(303, '/');
  }
};
