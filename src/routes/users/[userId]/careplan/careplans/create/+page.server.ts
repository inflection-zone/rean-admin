import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import type { RequestEvent } from '@sveltejs/kit';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { searchCareplanCategories } from '$routes/api/services/careplan/scheduling';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { createCareplan } from '$routes/api/services/careplan/careplans';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    //   console.log(`session id received - ${sessionId}`);
    try {
        const response = await searchCareplanCategories(sessionId);

        const careplanCategories = response.Data.Items;
        console.log(`Careplan Categories = ${JSON.stringify(careplanCategories)}`);
        return {
            careplanCategories
        };
    }
    catch (error) {
        console.error(`Error retriving care plan: ${error.message}`);
    }
};

const createCareplanSchema = zfd.formData({
    code: z.string().optional(),
    categoryId: z.string().optional(),
    name: z.string().max(128),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    version: z.string().optional()
});

export const actions = {
    createCareplanAction: async (event: RequestEvent) => {
        const request = event.request;
        const userId = event.params.userId;
        const sessionId = event.cookies.get('sessionId');
        const data = await request.formData();
        const formData = Object.fromEntries(data);
        const tags = data.has('tags') ? data.getAll('tags') : [];
        const formDataValue = { ...formData, tags: tags };

        type CareplanSchema = z.infer<typeof createCareplanSchema>;

        let result: CareplanSchema = {};
        try {
            result = createCareplanSchema.parse(formDataValue);
            console.log('result', result);
        } catch (err: any) {
            const { fieldErrors: errors } = err.flatten();
            console.log(errors);
            const { ...rest } = formData;
            return {
                data: rest,
                errors
            };
        }

        const response = await createCareplan(
            sessionId,
            result.code,
            result.categoryId,
            result.name,
            result.description,
            result.tags,
            result.version
        );
        const id = response.Data.id;
        console.log(response);
        if (response.Status === 'failure' || response.HttpCode !== 201) {
            throw redirect(303, `/users/${userId}/careplan/cateplans`, errorMessage(response.Message), event);
        }
        throw redirect(
            303,
            `/users/${userId}/careplan/careplans/${id}/view`,
            successMessage(`Careplan created successfully!`),
            event
        );
    }
};
