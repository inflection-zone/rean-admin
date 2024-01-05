import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createOrganization = async (
	sessionId: string,
	type: string,
	name: string,
	contactPhone: string,
	contactEmail: string,
	about: string,
	operationalSince: string,
	address: string[],
	imageResourceId: string,
	isHealthFacility: boolean
) => {
	const body = {
		Type: type,
		Name: name ? name : null,
		ContactPhone: contactPhone ? contactPhone : null,
		ContactEmail: contactEmail ? contactEmail : null,
		About: about ? about : null,
		OperationalSince: operationalSince ? operationalSince : null,
		AddressIds: address,
		ImageResourceId: imageResourceId ? imageResourceId : null,
		IsHealthFacility: isHealthFacility ? isHealthFacility : false
	};
	const url = BACKEND_API_URL + '/organizations';
	return await post_(sessionId, url, body, true);
};

export const getOrganizationById = async (sessionId: string, organizationId: string) => {
	const url = BACKEND_API_URL + `/organizations/${organizationId}`;
	return await get_(sessionId, url, true);
};

export const searchOrganizations = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/organizations/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateOrganization = async (
	sessionId: string,
	organizationId: string,
	type: string,
	name: string,
	contactPhone: string,
	email: string,
	about: string,
	operationalSince: string,
	address: string,
	imageResourceId: string,
	isHealthFacility: boolean
) => {
	const body = {
		Type: type,
		Name: name ? name : null,
		ContactPhone: contactPhone ? contactPhone : null,
		ContactEmail: email ? email : null,
		About: about ? about : null,
		OperationalSince: operationalSince ? operationalSince : null,
		AddressIds: address,
		ImageResourceId: imageResourceId ? imageResourceId : null,
		IsHealthFacility: isHealthFacility ? isHealthFacility : false
	};
	const url = BACKEND_API_URL + `/organizations/${organizationId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteOrganization = async (sessionId: string, organizationId: string) => {
	const url = BACKEND_API_URL + `/organizations/${organizationId}`;
	return await delete_(sessionId, url, true);
};
