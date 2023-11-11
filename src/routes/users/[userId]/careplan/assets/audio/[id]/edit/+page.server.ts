import { error, type RequestEvent } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';
import type { PageServerLoad } from './$types';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { zfd } from 'zod-form-data';
import { z } from 'zod';
import { getAudioById, updateAudio } from '$routes/api/services/careplan/assets/audio';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
  const sessionId = event.cookies.get('sessionId');
  try {
    const audioId = event.params.id;
    console.log(audioId);
    const response = await getAudioById(sessionId, audioId);

    if (response.Status === 'failure' || response.HttpCode !== 200) {
      throw error(response.HttpCode, response.Message);
    }
    const audio = response.Data;
    return {
      audio
    };
  } catch (error) {
    console.error(`Error retriving audio: ${error.message}`);
  }
};

const updateAudioSchema = zfd.formData({
	name: z.string().max(128),
	transcript: z.string().optional(),
	pathUrl: z.string().optional(),
	tags: z.array(z.string()).optional(),
	version: z.string().optional()
});

export const actions = {
	updateAudioAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const animationId = event.params.id;
		const sessionId = event.cookies.get('sessionId');
		const data = await request.formData();
		const formData = Object.fromEntries(data);
		const tags = data.has('tags') ? data.getAll('tags') : [];
		const formDataValue = { ...formData, tags: tags };

		type AudioSchema = z.infer<typeof updateAudioSchema>;

		let result: AudioSchema = {};
		try {
			result = updateAudioSchema.parse(formDataValue);
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

		const response = await updateAudio(
			sessionId,
			animationId,
			result.name,
			result.transcript,
			result.pathUrl,
			result.tags,
			result.version
		);
		console.log(response);
		const id = response.Data.id;
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw redirect(303, `/users/${userId}/assets/careplan`, errorMessage(response.Message), event);
		}
		throw redirect(
			303,
			`/users/${userId}/careplan/assets/audio/${id}/view`,
			successMessage(`Audio updated successfully!`),
			event
		);
	}
};

