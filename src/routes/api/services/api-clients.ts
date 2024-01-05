import { BACKEND_API_URL } from '$env/static/private';
import chalk from 'chalk';
import { delete_, get_, post_, put_ } from './common';
import { error } from '@sveltejs/kit';
import { Helper } from '$lib/utils/helper';

////////////////////////////////////////////////////////////////

export const createApiClient = async (
	sessionId: string,
	clientName: string,
	password: string,
	phone: string,
	email: string
) => {
	const body = {
		ClientName: clientName,
		Password: password,
		Phone: phone,
		Email: email
	};
	if (Helper.isPhone(phone)) {
		body.Phone = Helper.sanitizePhone(phone);
	}
	const url = BACKEND_API_URL + '/api-clients';
	return await post_(sessionId, url, body, true);
};

export const getApiClientById = async (sessionId: string, apiClientId: string) => {
	const url = BACKEND_API_URL + `/api-clients/${apiClientId}`;
	return await get_(sessionId, url, true);
};

export const searchApiClients = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/api-clients/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateApiClient = async (
	sessionId: string,
	apiClientId: string,
	clientName: string,
	password: string,
	phone: string,
	email: string
) => {
	const body = {
		ClientName: clientName,
		Password: password,
		Phone: phone,
		Email: email
	};
	const url = BACKEND_API_URL + `/api-clients/${apiClientId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteApiClient = async (sessionId: string, apiClientId: string) => {
	const url = BACKEND_API_URL + `/api-clients/${apiClientId}`;
	return await delete_(sessionId, url, true);
};

export const getCurrentApiKey = async (
	apiClientCode: string,
	userName: string,
	password: string
) => {
	const url = BACKEND_API_URL + `/api-clients/${apiClientCode}/current-api-key`;
	const UserName = userName;
	const Password = password;
	return await get(url, true, UserName, Password);
};

export const updateApiKey = async (
	apiClientCode: string,
	userName: string,
	password: string,
	validFrom?: Date,
	validTill?: Date
) => {
	const body = {
		ValidFrom: validFrom,
		ValidTill: validTill
	};
	const url = BACKEND_API_URL + `/api-clients/${apiClientCode}/renew-api-key`;
	return await put(url, body, true, userName, password);
};

const get = async (url: string, authorizeUser = false, userName: string, password: string) => {
	const headers = {};
	headers['Content-Type'] = 'application/json';
	const authorization = userName + ':' + password;
	const basicAuth = Helper.encodeToBase64(authorization);

	if (authorizeUser) {
		headers['Authorization'] = `Basic ${basicAuth}`;
	}

	const res = await fetch(url, {
		method: 'GET',
		headers
	});
	const response = await res.json();
	if (response.Status === 'failure') {
		if (response.HttpCode === 404) {
			console.log(chalk.red(`get_ response message: 404 - ${response.Message}`));
			return null;
		} else if (response.HttpCode !== 200) {
			console.log(chalk.red(`get_ response message: ${response.Message}`));
			throw error(response.HttpCode, response.Message);
		}
	}
	console.log(chalk.green(`get_ response message: ${response.Message}`));
	console.log(chalk.green(`get_ response: ${JSON.stringify(response, null, 2)}`));
	return response;
};

const put = async (
	url: string,
	bodyObj: unknown,
	authorizeUser = false,
	userName: string,
	password: string
) => {
	const headers = {};
	headers['Content-Type'] = 'application/json';
	const authorization = userName + ':' + password;
	const basicAuth = Helper.encodeToBase64(authorization);

	if (authorizeUser) {
		headers['Authorization'] = `Basic ${basicAuth}`;
	}

	const body = JSON.stringify(bodyObj);
	const res = await fetch(url, {
		method: 'PUT',
		body,
		headers
	});

	const response = await res.json();
	if (response.Status === 'failure' || (response.HttpCode !== 200 && response.HttpCode !== 201)) {
		console.log(chalk.red(`put_ response message: ${response.Message}`));
		throw error(response.HttpCode, response.Message);
	}
	console.log(chalk.green(`put_ response message: ${response.Message}`));
	return response;
};
