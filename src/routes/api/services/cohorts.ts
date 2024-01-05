import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createCohort = async (
	sessionId: string,
  tenantId: string,
	name: string,
	description: string,
	imageUrl: string,
) => {
	const body = {
    TenantId: tenantId,
		Name: name,
		Description: description ? description : null,
		ImageUrl: imageUrl ? imageUrl : null,
	};
	const url = BACKEND_API_URL + '/cohorts';
	return await post_(sessionId, url, body, true);
};

export const getCohortById = async (sessionId: string, cohortId: string) => {
	const url = BACKEND_API_URL + `/cohorts/${cohortId}`;
	return await get_(sessionId, url, true);
};

export const searchCohorts = async (sessionId: string, searchParams?: any) => {
	let searchString = '';
	if (searchParams) {
		const keys = Object.keys(searchParams);
		if (keys.length > 0) {
			searchString = '?';
			const params = [];
			for (const key of keys) {
				if (searchParams[key]) {
					const param = `${key}=${searchParams[key]}`;
					params.push(param);
				}
			}
			searchString += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/cohorts/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateCohort = async (
	sessionId: string,
	cohortId: string,
  tenantId: string,
	name: string,
	description: string,
	imageUrl: string,
) => {
	const body = {
    TenantId: tenantId,
		Name: name,
		Description: description ? description : null,
		ImageUrl: imageUrl ? imageUrl : null,
	};
	const url = BACKEND_API_URL + `/cohorts/${cohortId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteCohort = async (sessionId: string, cohortId: string) => {
	const url = BACKEND_API_URL + `/cohorts/${cohortId}`;
	return await delete_(sessionId, url, true);
};
