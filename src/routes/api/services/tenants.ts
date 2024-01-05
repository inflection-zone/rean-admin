import { BACKEND_API_URL } from '$env/static/private';
import { Helper } from '$lib/utils/helper';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createTenant = async (
	sessionId: string,
	name: string,
	description: string,
  code: string,
  phone: string,
	email: string,
) => {
	const body = {
		Name: name,
		Description: description ? description : null,
    Code: code,
		Phone: phone ? phone : null,
    Email: email ? email : null
	};

	if (Helper.isPhone(phone)) {
		body.Phone = Helper.sanitizePhone(phone);
	};
	const url = BACKEND_API_URL + '/tenants';
	return await post_(sessionId, url, body, true, false);
};

export const getTenantById = async (sessionId: string, tenantId: string) => {
	const url = BACKEND_API_URL + `/tenants/${tenantId}`;
	return await get_(sessionId, url, true);
};

export const searchTenants = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/tenants/search${searchString}`;
	return await get_(sessionId, url, true, false);
};

export const updateTenant = async (
	sessionId: string,
  tenantId: string,
	name: string,
	description: string,
  code: string,
  phone: string,
	email: string,
) => {
	const body = {
    Name: name,
		Description: description ? description : null,
    Code: code,
		Phone: phone ? phone : null,
    Email: email ? email : null,
	};
	if (Helper.isPhone(phone)) {
		body.Phone = Helper.sanitizePhone(phone);
	};
	const url = BACKEND_API_URL + `/tenants/${tenantId}`;
	return await put_(sessionId, url, body, true, false);
};

export const deleteTenant = async (sessionId: string, tenantId: string) => {
	const url = BACKEND_API_URL + `/tenants/${tenantId}`;
	return await delete_(sessionId, url, true, false);
};
