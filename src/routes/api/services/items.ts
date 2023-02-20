import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createItem = async (
	sessionId: string,
	title: string,
	description: string,
	newsfeed: string,
	type: string,
	link: string,
	author: string,
	date: Date
) => {
	const body = {
		Title: title,
		Description: description,
		Newsfeed: newsfeed,
		Type: type,
		Link: link,
		Author: author,
		Date: date
	};

	const url = BACKEND_API_URL + '/rss-feeds/feed-items';
	return await post_(sessionId, url, body, true);
};

export const getItemById = async (sessionId: string, itemId: string) => {
	const url = BACKEND_API_URL + `/rss-feeds/feed-items${itemId}`;
	return await get_(sessionId, url, true);
};

export const searchItems = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/rss-feeds/feed-items/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateItem = async (
	sessionId: string,
	itemId: string,
	title: string,
	description: string,
	newsfeed: string,
	type: string,
	link: string,
	author: string,
	date: Date
) => {
	const body = {
		Title: title,
		Description: description,
		Newsfeed: newsfeed,
		Type: type,
		Link: link,
		Author: author,
		Date: date
	};
	const url = BACKEND_API_URL + `/rss-feeds/feed-items${itemId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteItem = async (sessionId: string, itemId: string) => {
	const url = BACKEND_API_URL + `/rss-feeds/feed-items${itemId}`;
	return await delete_(sessionId, url, true);
};