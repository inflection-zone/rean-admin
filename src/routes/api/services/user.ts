import type { LoginModel } from '$lib/types/domain.models';
import { Helper } from '$lib/utils/helper';
import { API_CLIENT_INTERNAL_KEY, BACKEND_API_URL } from '$env/static/private';
import { post_ } from './common';
////////////////////////////////////////////////////////////////

export const login = async (username: string, password: string, loginRoleId: number) => {
	const model: LoginModel = getLoginModel(username, password, loginRoleId);
	console.log(JSON.stringify(model, null, 2));

	const headers = {};
	headers['Content-Type'] = 'application/json';
	headers['x-api-key'] = API_CLIENT_INTERNAL_KEY;
	const body = JSON.stringify(model);
	console.log('model', model);
	const url =
		BACKEND_API_URL + (model.Password ? '/users/login-with-password' : '/users/login-otp');
	const res = await fetch(url, {
		method: 'POST',
		body,
		headers
	});
	const response = await res.json();
	console.log('response', response);
	return response;
};

const getLoginModel = (username: string, password: string, loginRoleId: number): LoginModel => {
	const loginModel: LoginModel = {
		LoginRoleId: loginRoleId ?? 1
	};

	if (Helper.isEmail(username)) {
		loginModel.Email = username;
	} else if (Helper.isPhone(username)) {
		loginModel.Phone = username;
	} else {
		loginModel.UserName = username;
	}

	if (Helper.isOtp(password)) {
		loginModel.Otp = password;
	} else {
		loginModel.Password = password;
	}
	return loginModel;
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const logout = async (sessionId: string) => {
	const url = BACKEND_API_URL + `/users/logout`;
	return await post_(sessionId, url, {}, true);
};

////////////////////////////////////////////////////////////////////////////////////
