import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createDrug = async (
	sessionId: string,
	drugName: string,
	genericName: string,
	ingredients: string,
	strength: string,
	otherCommercialNames: string,
	manufacturer: string,
	otherInformation: string
) => {
	const body = {
		DrugName: drugName,
		GenericName: genericName ? genericName : null,
		Ingredients: ingredients ? ingredients : null,
		Strength: strength ? strength : null,
		OtherCommercialNames: otherCommercialNames ? otherCommercialNames : null,
		Manufacturer: manufacturer ? manufacturer : null,
		OtherInformation: otherInformation ? otherInformation : null
	};
	const url = BACKEND_API_URL + '/clinical/drugs';
	return await post_(sessionId, url, body, true);
};

export const getDrugById = async (sessionId: string, drugId: string) => {
	const url = BACKEND_API_URL + `/clinical/drugs/${drugId}`;
	return await get_(sessionId, url, true);
};

export const searchDrugs = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/clinical/drugs/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateDrug = async (
	sessionId: string,
	drugId: string,
	drugName: string,
	genericName: string,
	ingredients: string,
	strength: string,
	otherCommercialNames: string,
	manufacturer: string,
	otherInformation: string
) => {
	const body = {
		DrugName: drugName,
		GenericName: genericName ? genericName : null,
		Ingredients: ingredients ? ingredients : null,
		Strength: strength ? strength : null,
		OtherCommercialNames: otherCommercialNames ? otherCommercialNames : null,
		Manufacturer: manufacturer ? manufacturer : null,
		OtherInformation: otherInformation ? otherInformation : null
	};
	const url = BACKEND_API_URL + `/clinical/drugs/${drugId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteDrug = async (sessionId: string, drugId: string) => {
	const url = BACKEND_API_URL + `/clinical/drugs/${drugId}`;
	return await delete_(sessionId, url, true);
};
