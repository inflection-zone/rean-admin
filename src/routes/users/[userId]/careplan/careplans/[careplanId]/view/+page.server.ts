import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { redirect } from 'sveltekit-flash-message/server';
import { errorMessage } from '$lib/utils/message.utils';
import { getCareplanById, searchCareplanCategories } from '$routes/api/services/careplan/careplans';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad =  async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    console.log('sessionId', sessionId);
    try {
        const careplanId = event.params.careplanId;
        const userId = event.params.userId;
        console.log(careplanId);
        const response = await getCareplanById(sessionId, careplanId);
        
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw redirect(303, `/users/${userId}/careplans`, errorMessage(response.Message), event);
        }
        const careplan = response.Data;
        console.log('Care plan',careplan);
        const id = response.Data.id;
        const _careplanCategories = await searchCareplanCategories(sessionId);
        const careplanCategories = _careplanCategories.Data.Items;
            return {
                location :`${id}/edit`,
                careplan,
                careplanCategories,
                message: response.Message
            }
    }
    catch (error) {
        console.error(`Error retriving care plan: ${error.message}`);
 
    }
}