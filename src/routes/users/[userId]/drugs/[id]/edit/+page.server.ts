import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import type { PageServerLoad } from './$types';
import { getDrugById, updateDrug } from '../../../../../api/services/drugs';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const drugId = event.params.id;
		const response = await getDrugById(sessionId, drugId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const drug = response.Data.Drug;
		const id = response.Data.Drug.id;
		return {
			location: `${id}/edit`,
			drug,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving drug: ${error.message}`);
	}
};

const updateDrugSchema = zfd.formData({
	drugName: z.string().max(128),
	genericName: z.string().optional(),
	ingredients: z.string().optional(),
	strength: z.string().optional(),
	otherCommercialNames: z.string().optional(),
	manufacturer: z.string().optional(),
	otherInformation: z.string().optional()
});

export const actions = {
	updateDrugAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const drugId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type DrugSchema = z.infer<typeof updateDrugSchema>;

		let result: DrugSchema = {};
		try {
			result = updateDrugSchema.parse(formData);
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

		const response = await updateDrug(
			sessionId,
			drugId,
			result.drugName,
			result.genericName,
			result.ingredients,
			result.strength,
			result.otherCommercialNames,
			result.manufacturer,
			result.otherInformation
		);
		const id = response.Data.Drug.id;

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/drugs`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/drugs/${id}/view`,
			successMessage(`Drug updated successfully!`),
			event
		);
	}
};
