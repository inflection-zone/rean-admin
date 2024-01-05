import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createSymptom = async (
	sessionId: string,
	symptom: string,
	description: string,
	tags: string[],
	language: string,
	imageResourceId: string
) => {
	const body = {
		Symptom: symptom,
		Description: description ? description : null,
		Tags: tags ? tags : null,
		Language: language,
		ImageResourceId: imageResourceId
	};
	const url = BACKEND_API_URL + '/clinical/symptom-types';
	return await post_(sessionId, url, body, true);
};

export const getSymptomById = async (sessionId: string, symptonId: string) => {
	const url = BACKEND_API_URL + `/clinical/symptom-types/${symptonId}`;
	return await get_(sessionId, url, true);
};

export const searchSymptoms = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/clinical/symptom-types/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateSymptom = async (
	sessionId: string,
	symptonId: string,
	symptom: string,
	description: string,
	tags: string[],
	language: string,
	imageResourceId: string
) => {
	const body = {
		Symptom: symptom,
		Description: description ? description : null,
		Tags: tags ? tags : null,
		Language: language,
		ImageResourceId: imageResourceId
	};
	const url = BACKEND_API_URL + `/clinical/symptom-types/${symptonId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteSymptom = async (sessionId: string, symptonId: string) => {
	const url = BACKEND_API_URL + `/clinical/symptom-types/${symptonId}`;
	return await delete_(sessionId, url, true);
};
