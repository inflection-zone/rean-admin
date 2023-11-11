import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import {
	getPhysiotherapyById,
	updatePhysiotherapy
} from '$routes/api/services/careplan/assets/physiotherapy';
import { zfd } from 'zod-form-data';
import { z } from 'zod';

/////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const physiotherapyId = event.params.id;
		const response = await getPhysiotherapyById(sessionId, physiotherapyId);
		const physiotherapy = response.Data;
		return {
			physiotherapy
		};
	} catch (error) {
		console.error(`Error retriving physiotherapy: ${error.message}`);
	}
};

const updatePhysiotherapySchema = zfd.formData({
	name: z.string().max(128),
	description: z.string().optional(),
	recommendedDurationMin: zfd.numeric(z.number().optional()),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updatePhysiotherapyAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const physiotheropyId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type PhysiotherapySchema = z.infer<typeof updatePhysiotherapySchema>;

		let result: PhysiotherapySchema = {};
		try {
			result = updatePhysiotherapySchema.parse(formDataValue);
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

		const response = await updatePhysiotherapy(
			sessionId,
			physiotheropyId,
			result.name,
			result.description,
			result.recommendedDurationMin,
			result.tags,
			result.version
		);
		const id = response.Data.id;
		console.log(response);
		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/careplan/assets`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/careplan/assets/physiotherapy/${id}/view`,
			successMessage(`Physiotherapy updated successfully!`),
			event
		);
	}
};
