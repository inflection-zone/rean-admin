import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

//////////////////////////////////////////////////////////////////////////////////////////////////

export const createAddress = async (
	sessionId: string,
	type: string,
	addressLine: string,
	city: string,
	district: string,
	state: string,
	country: string,
	postalCode: number
) => {
	const body = {
		Type: type ? type : 'Home',
		AddressLine: addressLine,
		City: city ? city : null,
		District: district ? district : null,
		State: state ? state : null,
		Country: country ? country : null,
		PostalCode: postalCode ? postalCode : null
	};
	const url = BACKEND_API_URL + '/addresses';
	return await post_(sessionId, url, body, true);
};

export const getAddressById = async (sessionId: string, addressId: string) => {
	const url = BACKEND_API_URL + `/addresses/${addressId}`;
	return await get_(sessionId, url, true);
};

export const searchAddress = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/addresses/search${searchString}`;

	return await get_(sessionId, url, true);
};

export const updateAddress = async (
	sessionId: string,
	addressId: string,
	type: string,
	addressLine: string,
	city: string,
	district: string,
	state: string,
	country: string,
	postalCode: number
) => {
	const body = {
		Type: type ? type : 'Home',
		AddressLine: addressLine,
		City: city ? city : null,
		District: district ? district : null,
		State: state ? state : null,
		Country: country ? country : null,
		PostalCode: postalCode ? postalCode : null
	};
	const url = BACKEND_API_URL + `/addresses/${addressId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteAddress = async (sessionId: string, addressId: string) => {
	const url = BACKEND_API_URL + `/api-clients/${addressId}`;
	return await delete_(sessionId, url, true);
};
