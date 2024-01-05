import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Action } from './$types';
import { searchAssets } from '$routes/api/services/careplan/assets/action-plan';
import { getAssetsType } from '$routes/api/services/careplan/assets/asset';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad  = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  const userId = event.params.userId;
  console.log('sessionId', sessionId);
  const assetType = event.params.assetTypes;
  try {
    const response = await searchAssets(sessionId,'action-plans');
    const assets = response.Data;
    const assetTypes = await getAssetsType(sessionId);
    return {
      assets,
      assetTypes,
      sessionId
    };
  } catch (error) {
    console.error(`Error retriving assets: ${error.message}`);
    throw redirect(303,`/users/${userId}/home`,errorMessage('Error retriving assets'), event) 
  }
};

/////////////////////////////////////////////////////////////////////////

