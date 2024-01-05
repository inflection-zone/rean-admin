import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createDrug } from '../../../../api/services/drugs';

/////////////////////////////////////////////////////////////////////////

const createDrugSchema = zfd.formData({
	drugName: z.string().max(128),
	genericName: z.string().optional(),
	ingredients: z.string().optional(),
	strength: z.string().optional(),
	otherCommercialNames: z.string().optional(),
	manufacturer: z.string().optional(),
	otherInformation: z.string().optional()
});

export const actions = {
	createDrugAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type DrugSchema = z.infer<typeof createDrugSchema>;

		let result: DrugSchema = {};
		try {
			result = createDrugSchema.parse(formData);
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

		const response = await createDrug(
			sessionId,
			result.drugName,
			result.genericName,
			result.ingredients,
			result.strength,
			result.otherCommercialNames,
			result.manufacturer,
			result.otherInformation
		);
		const id = response.Data.Drug.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(303, `/users/${userId}/drugs`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/drugs/${id}/view`,
			successMessage(`Drug created successfully!`),
			event
		);
	}
};
