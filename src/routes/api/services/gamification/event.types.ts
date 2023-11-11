import { AWARDS_BACKEND_API_URL, AWARDS_SERVICE_API_KEY } from '$env/static/private';
import { delete_, get_, post_, put_ } from '../common';

////////////////////////////////////////////////////////////////

export const createEventType = async (sessionId: string, name: string, description: string) => {
	const body = {
		Name: name,
		Description: description ? description : null
	};
	const url = AWARDS_BACKEND_API_URL + '/engine/event-types';
	return await post_(sessionId, url, body, true, true, AWARDS_SERVICE_API_KEY);
};

export const getEventTypeById = async (sessionId: string, eventTypeId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/engine/event-types/${eventTypeId}`;
	return await get_(sessionId, url, true, true, AWARDS_SERVICE_API_KEY);
};

export const searchEventTypes = async (sessionId: string, searchParams?: any) => {
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
	console.log("searchString",searchString)
	const url = AWARDS_BACKEND_API_URL + `/engine/event-types/search${searchString}`;
	console.log("url", url);
	return await get_(sessionId, url, true, true, AWARDS_SERVICE_API_KEY);
};

export const updateEventType = async (
	sessionId: string,
	eventTypeId: string,
	name: string,
	description: string
) => {
	const body = {
		Name: name,
		Description: description ? description : null
	};
	const url = AWARDS_BACKEND_API_URL + `/engine/event-types/${eventTypeId}`;
	return await put_(sessionId, url, body, true, true, AWARDS_SERVICE_API_KEY);
};

export const deleteEventType = async (sessionId: string, eventTypeId: string) => {
	const url = AWARDS_BACKEND_API_URL + `/engine/event-types/${eventTypeId}`;
	return await delete_(sessionId, url, true, true, AWARDS_SERVICE_API_KEY);
};
