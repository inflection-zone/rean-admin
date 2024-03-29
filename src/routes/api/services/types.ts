import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from '$env/static/private';
import type { PersonRole, OrganizationTypes } from '$lib/types/domain.models';

/////////////////////////////////////////////////////////////////////

export const getUserRoles = async (): Promise<PersonRole[]> => {
	try {
		const headers: { [key: string]: any } = {};
		headers['Content-Type'] = 'application/json';
		headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
		const url = BACKEND_API_URL + '/types/person-roles';

		const res = await fetch(url, {
			method: 'GET',
			headers
		});
		const response = await res.json();
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			console.log(`status code: ${response.HttpCode}`);
			console.log(`error message: ${response.Message}`);
			return [];
		}
		return response.Data.PersonRoleTypes;
	} catch (error) {
		console.error(`Error retrieving user roles: ${error.message}`);
		return [];
	}
};

export const getOrganizationTypes = async (): Promise<OrganizationTypes[]> => {
	try {
		const headers: { [key: string]: any } = {};
		headers['Content-Type'] = 'application/json';
		headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
		const url = BACKEND_API_URL + '/types/organization-types';

		const res = await fetch(url, {
			method: 'GET',
			headers
		});
		const response = await res.json();
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			console.log(`status code: ${response.HttpCode}`);
			console.log(`error message: ${response.Message}`);
			return [];
		}
		return response.Data.OrganizationTypes;
	} catch (error) {
		console.error(`Error retrieving user roles: ${error.message}`);
		return [];
	}
};
