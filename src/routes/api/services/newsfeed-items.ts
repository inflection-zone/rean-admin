import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createNewsfeedItem = async (
	sessionId: string,
	newsfeedId: string,
	title: string,
	description: string,
	link: string,
	content: string,
	authorName: string,
	authorEmail: string,
	authorLink: string,
	image: string
) => {
	if (image === 'undefined') {
		image = null;
	}
	const body = {
		FeedId: newsfeedId,
		Title: title,
		Description: description ? description : null,
		Link: link ? link : null,
		Content: content,
		AuthorName: authorName ? authorName : null,
		AuthorEmail: authorEmail ? authorEmail : null,
		AuthorLink: authorLink ? authorLink : null,
		Image: image
	};
	console.log("body", body)
	const url = BACKEND_API_URL + '/rss-feeds/feed-items';
	return await post_(sessionId, url, body, true);
};

export const getNewsfeedItemById = async (sessionId: string, newsfeedItemId: string) => {
	const url = BACKEND_API_URL + `/rss-feeds/feed-items/${newsfeedItemId}`;
	return await get_(sessionId, url, true);
};

export const searchNewsfeedItems = async (sessionId: string, searchParams?: any) => {
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

export const updateNewsfeedItem = async (
	sessionId: string,
	newsfeedItemId: string,
	newsfeedId: string,
	title: string,
	description: string,
	link: string,
	content: string,
	authorName: string,
	authorEmail: string,
	authorLink: string,
	image: string
) => {
	const body = {
		FeedId: newsfeedId,
		Title: title,
		Description: description ? description : null,
		Link: link ? link : null,
		Content: content,
		AuthorName: authorName ? authorName : null,
		AuthorEmail: authorEmail ? authorEmail : null,
		AuthorLink: authorLink ? authorLink : null,
		Image: image ? image : null
	};
	const url = BACKEND_API_URL + `/rss-feeds/feed-items/${newsfeedItemId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteNewsfeedItem = async (sessionId: string, newsfeedItemId: string) => {
	const url = BACKEND_API_URL + `/rss-feeds/feed-items/${newsfeedItemId}`;
	return await delete_(sessionId, url, true);
};
