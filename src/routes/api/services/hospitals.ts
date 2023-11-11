import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createHospital = async (
	sessionId: string,
	name: string,
	healthSystemId: string,
	tags: string[]
) => {
	const body = {
		Name: name,
		HealthSystemId: healthSystemId ? healthSystemId : null,
		Tags: tags ? tags : []
	};
	const url = BACKEND_API_URL + '/hospitals';
	return await post_(sessionId, url, body, true);
};

export const getHospitalById = async (sessionId: string, hospitalId: string) => {
	const url = BACKEND_API_URL + `/hospitals/${hospitalId}`;
	return await get_(sessionId, url, true);
};

export const searchHospitals = async (sessionId: string, searchParams?) => {
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
	const url = BACKEND_API_URL + `/hospitals/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateHospital = async (
	sessionId: string,
	hospitalId: string,
	name: string,
	healthSystemId: string,
	tags: string[]
) => {
	const body = {
		hospitalId,
		Name: name,
		HealthSystemId: healthSystemId ? healthSystemId : null,
		Tags: tags ? tags : null
	};
	const url = BACKEND_API_URL + `/hospitals/${hospitalId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteHospital = async (sessionId: string, hospitalId: string) => {
	const url = BACKEND_API_URL + `/hospitals/${hospitalId}`;
	return await delete_(sessionId, url, true);
};

export const getHospitalsForHealthSystem = async (sessionId: string, healthSystemId: string) => {
    const url = BACKEND_API_URL + `/hospitals/health-systems/${healthSystemId}`;
    return await get_(sessionId, url, true);
};
