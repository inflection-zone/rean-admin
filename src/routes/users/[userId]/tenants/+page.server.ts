import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { searchTenants } from '$routes/api/services/tenants';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');

	try {
		const response = await searchTenants(sessionId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
		const tenants = response.Data.TenantRecords;
		return {
			tenants,
			sessionId,
			message: response.Message
		};
	} catch (error) {
		console.error(`Error retriving tenants: ${error.message}`);
	}
};
