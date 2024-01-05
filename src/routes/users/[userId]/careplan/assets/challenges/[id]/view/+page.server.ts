import { getChallengeById } from '$routes/api/services/careplan/assets/challenge';
import type { PageServerLoad } from './$types';
import { error, type RequestEvent } from '@sveltejs/kit';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  try {
    const challengeId = event.params.id;
    const response = await getChallengeById(sessionId, challengeId);
    console.log( response);
    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const challenge = response.Data;
    return {
      challenge
    };
  } catch (error) {
    console.error(`Error retriving challenge: ${error.message}`);
  }
};
