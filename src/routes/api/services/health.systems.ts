import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createHealthSystem = async (
	sessionId: string,
	name: string,
	tags: string[]
) => {
	const body = {
		Name: name,
		Tags: tags ? tags : []
	};
	const url = BACKEND_API_URL + '/health-systems';
	return await post_(sessionId, url, body, true);
};

export const getHealthSystemById = async (sessionId: string, healthSystemId: string) => {
	const url = BACKEND_API_URL + `/health-systems/${healthSystemId}`;
	return await get_(sessionId, url, true);
};

export const searchHealthSystems = async (sessionId: string, searchParams?) => {
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
	const url = BACKEND_API_URL + `/health-systems/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateHealthSystem = async (
	sessionId: string,
	healthSystemId: string,
	name: string,
	tags: string[]
) => {
	const body = {
		healthSystemId,
		Name: name,
		Tags: tags ? tags : null
	};
	const url = BACKEND_API_URL + `/health-systems/${healthSystemId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteHealthSystem = async (sessionId: string, healthSystemId: string) => {
	const url = BACKEND_API_URL + `/health-systems/${healthSystemId}`;
	return await delete_(sessionId, url, true);
};

export const getHealthSystemsForTags = async (sessionId: string, tag: string) => {
    const url = BACKEND_API_URL + `/health-systems/by-tags/${tag}`;
    return await get_(sessionId, url, true);
};
