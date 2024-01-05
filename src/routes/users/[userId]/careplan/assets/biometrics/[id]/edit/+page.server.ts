import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	getBiometricsById,
	updateBiometrics
} from '$routes/api/services/careplan/assets/biometrics';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const biometricsId = event.params.id;
		console.log(biometricsId);
		const response = await getBiometricsById(sessionId, biometricsId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const biometrics = response.Data;
		return {
			biometrics
		};
	} catch (error) {
		console.error(`Error retriving biometrics: ${error.message}`);
	}
};

const updateBiometricsSchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	biometricsType: z.string().optional(),
	measurementUnit: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateBiometricsAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const biometricId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type BiometricsSchema = z.infer<typeof updateBiometricsSchema>;

		let result: BiometricsSchema = {};
		try {
			result = updateBiometricsSchema.parse(formDataValue);
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

		const response = await updateBiometrics(
			sessionId,
			biometricId,
			result.name,
			result.description,
			result.biometricsType,
			result.measurementUnit,
			result.tags,
			result.version
		);
		console.log(response);
		const id = response.Data.id;
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(
				303,
				`/users/${userId}/careplan/assets`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/careplan/assets/biometrics/${id}/view`,
			successMessage(`Biometrics updated successfully!`),
			event
		);
	}
};
