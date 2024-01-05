import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createLabRecordType = async (
	sessionId: string,
	typeName: string,
	displayName: string,
	snowmedCode: string,
	loincCode: string,
	normalRangeMin: number,
	normalRangeMax: number,
	unit: string
) => {
	const body = {
		TypeName: typeName,
		DisplayName: displayName ? displayName : null,
		SnowmedCode: snowmedCode ? snowmedCode : null,
		LoincCode: loincCode ? loincCode : null,
		NormalRangeMin: normalRangeMin ? normalRangeMin : null,
		NormalRangeMax: normalRangeMax ? normalRangeMax : null,
		Unit: unit ? unit : null
	};
	const url = BACKEND_API_URL + '/types/lab-records';
	return await post_(sessionId, url, body, true);
};

export const getLabRecordTypeById = async (sessionId: string, labRecordTypeId: string) => {
	const url = BACKEND_API_URL + `/types/lab-records/${labRecordTypeId}`;
	return await get_(sessionId, url, true);
};

export const searchLabRecordTypes = async (sessionId: string, searchParams?: any) => {
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
		}
	}
	const url = BACKEND_API_URL + `/types/lab-records`;
	console.log(url);
	return await get_(sessionId, url, true);
};

export const updateLabRecordType = async (
	sessionId: string,
	labRecordTypeId: string,
	typeName: string,
	displayName: string,
	snowmedCode: string,
	loincCode: string,
	normalRangeMin: number,
	normalRangeMax: number,
	unit: string
) => {
	const body = {
		TypeName: typeName,
		DisplayName: displayName ? displayName : null,
		SnowmedCode: snowmedCode ? snowmedCode : null,
		LoincCode: loincCode ? loincCode : null,
		NormalRangeMin: normalRangeMin ? normalRangeMin : null,
		NormalRangeMax: normalRangeMax ? normalRangeMax : null,
		Unit: unit ? unit : null
	};
	const url = BACKEND_API_URL + `/types/lab-records/${labRecordTypeId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteLabRecordType = async (sessionId: string, labRecordTypeId: string) => {
	const url = BACKEND_API_URL + `/types/lab-records/${labRecordTypeId}`;
	return await delete_(sessionId, url, true);
};
