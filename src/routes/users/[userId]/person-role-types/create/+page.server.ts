import { redirect } from 'sveltekit-flash-message/server';
import type { RequestEvent } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { errorMessage, successMessage } from '$lib/utils/message.utils';
import { createPersonRoleType } from '../../../../api/services/person-role-types';

/////////////////////////////////////////////////////////////////////////

const createPersonRoleSchema = zfd.formData({
	roleName: z.string().min(1).max(32),
	description: z.string().optional()
});

export const actions = {
	createPersonRoleTypeAction: async (event: RequestEvent) => {
		const request = event.request;
		const userId = event.params.userId;
		const sessionId = event.cookies.get('sessionId');
		const formData = Object.fromEntries(await request.formData());

		type PersonRoleSchema = z.infer<typeof createPersonRoleSchema>;

		let result: PersonRoleSchema = {};
		try {
			result = createPersonRoleSchema.parse(formData);
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

		const response = await createPersonRoleType(sessionId, result.roleName, result.description);
		const id = response.Data.RoleType.id;

		if (response.Status === 'failure' || response.HttpCode !== 201) {
			throw redirect(
				303,
				`/users/${userId}/person-role-types`,
				errorMessage(response.Message),
				event
			);
		}
		throw redirect(
			303,
			`/users/${userId}/person-role-types/${id}/view`,
			successMessage(`Person role type created successfully!`),
			event
		);
	}
};
