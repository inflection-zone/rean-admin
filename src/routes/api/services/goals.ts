import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createGoal = async (sessionId: string, type: string, tags: string[]) => {
	const body = {
		Type: type,
		Tags: tags ? tags : null
	};
	const url = BACKEND_API_URL + '/types/goal-types';
	return await post_(sessionId, url, body, true);
};

export const getGoalById = async (sessionId: string, goalId: string) => {
	const url = BACKEND_API_URL + `/types/goal-types/${goalId}`;
	return await get_(sessionId, url, true);
};

export const searchGoals = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/types/goal-types/`;
	return await get_(sessionId, url, true);
};

export const updateGoal = async (
	sessionId: string,
	goalId: string,
	type: string,
	tags: string[]
) => {
	const body = {
		Type: type,
		Tags: tags ? tags : null
	};
	const url = BACKEND_API_URL + `/types/goal-types/${goalId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteGoal = async (sessionId: string, goalId: string) => {
	const url = BACKEND_API_URL + `/types/goal-types/${goalId}`;
	return await delete_(sessionId, url, true);
};
