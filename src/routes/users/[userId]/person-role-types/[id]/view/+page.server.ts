import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getPersonRoleTypeById } from '../../../../../api/services/person-role-types';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const personRoleTypeId = event.params.id;
		const response = await getPersonRoleTypeById(sessionId, personRoleTypeId);

		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const personRoleType = response.Data.RoleType;
		const id = response.Data.RoleType.id;
		return {
			location: `${id}/edit`,
			personRoleType,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving person role type: ${error.message}`);
	}
};
