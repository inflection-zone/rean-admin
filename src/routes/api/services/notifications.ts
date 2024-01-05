import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createNotification = async (
	sessionId: string,
	title: string,
	Body: string,
	type: string,
	broadcastToAll: boolean,
	imageUrl: string
) => {
	const body = {
		Title: title,
		Body: Body ? Body : null,
		Type: type ? type : null,
		BroadcastToAll: broadcastToAll ? broadcastToAll : false,
		ImageUrl: imageUrl ? imageUrl : null
	};
	const url = BACKEND_API_URL + '/general/notifications';
	return await post_(sessionId, url, body, true);
};

export const getNotificationById = async (sessionId: string, notificationId: string) => {
	const url = BACKEND_API_URL + `/general/notifications/${notificationId}`;
	return await get_(sessionId, url, true);
};

export const searchNotifications = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/general/notifications/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateNotification = async (
	sessionId: string,
	notificationId: string,
	title: string,
	Body: string,
	type: string,
	broadcastToAll: boolean,
	imageUrl: string
) => {
	const body = {
		Title: title,
		Body: Body ? Body : null,
		Type: type ? type : null,
		BroadcastToAll: broadcastToAll ? broadcastToAll : false,
		ImageUrl: imageUrl ? imageUrl : null
	};
	const url = BACKEND_API_URL + `/general/notifications/${notificationId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteNotification = async (sessionId: string, notificationId: string) => {
	const url = BACKEND_API_URL + `/general/notifications/${notificationId}`;
	return await delete_(sessionId, url, true);
};
