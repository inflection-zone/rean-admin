import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { getCareplanById, searchCareplanCategories, updateCareplan } from '$routes/api/services/careplan/careplans';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    const userId = event.params.userId;
    try {
        const careplanId = event.params.careplanId;
        const response = await getCareplanById(sessionId, careplanId);
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw redirect(303, `/users/${userId}/careplans`, errorMessage(response.Message), event);
        }
        const _careplanCategories = await searchCareplanCategories(sessionId);
        const careplanCategories = _careplanCategories.Data.Items;
        const careplan = response.Data;
        return {
            careplan,
            careplanCategories
        };
    } catch (error) {
        console.error(`Error retriving care plan: ${error.message}`);
    }
};

const updateCareplanSchema = zfd.formData({
    code: z.string().optional(),
    categoryId: z.string().optional(),
    name: z.string().max(128),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    version: z.string().optional()
});

export const actions = {
    updateCareplanAction: async (event: RequestEvent) => {
        const request = event.request;
        const userId = event.params.userId;
        const careplanId = event.params.careplanId;
        const sessionId = event.cookies.get('sessionId');
        const data = await request.formData();
        const formData = Object.fromEntries(data);
        const tags = data.has('tags') ? data.getAll('tags') : [];
        const formDataValue = { ...formData, tags: tags };

        type CareplanSchema = z.infer<typeof updateCareplanSchema>;

        let result: CareplanSchema = {};
        try {
            result = updateCareplanSchema.parse(formDataValue);
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

        const response = await updateCareplan(
            sessionId,
            careplanId,
            result.code,
            result.categoryId,
            result.name,
            result.description,
            result.tags,
            result.version
        );
        const id = response.Data.id;
        console.log(response);
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw redirect(303, `/users/${userId}/careplan/careplans`, errorMessage(response.Message), event);
        }
        throw redirect(
            303,
            `/users/${userId}/careplan/careplans/${id}/view`,
            successMessage(`Careplan updated successfully!`),
            event
        );
    }
};