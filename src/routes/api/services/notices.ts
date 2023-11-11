import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createNotice = async (
	sessionId: string,
	title: string,
	description: string,
	link: string,
	daysActive: number,
	tags: string[],
	action: string,
	imageUrl: string
) => {
	const body = {
		Title: title,
		Description: description ? description : null,
		Link: link ? link : null,
		DaysActive: daysActive ? daysActive : null,
		Tags: tags ? tags : null,
		Action: action ? action : null,
		ImageUrl: imageUrl ? imageUrl : null
	};
	const url = BACKEND_API_URL + '/general/notices';
	return await post_(sessionId, url, body, true);
};

export const getNoticeById = async (sessionId: string, noticeId: string) => {
	const url = BACKEND_API_URL + `/general/notices/${noticeId}`;
	return await get_(sessionId, url, true);
};

export const searchNotices = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/general/notices/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateNotice = async (
	sessionId: string,
	noticeId: string,
	title: string,
	description: string,
	link: string,
	daysActive: number,
	tags: string[],
	action: string,
	imageUrl: string
) => {
	const body = {
		noticeId,
		Title: title,
		Description: description ? description : null,
		Link: link ? link : null,
		DaysActive: daysActive ? daysActive : null,
		Tags: tags ? tags : [],
		Action: action ? action : null,
		ImageUrl: imageUrl ? imageUrl : null
	};

	console.log("body",body);
	const url = BACKEND_API_URL + `/general/notices/${noticeId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteNotice = async (sessionId: string, noticeId: string) => {
	const url = BACKEND_API_URL + `/general/notices/${noticeId}`;
	return await delete_(sessionId, url, true);
};
