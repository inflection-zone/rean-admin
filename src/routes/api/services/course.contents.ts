import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createCourseContent = async (
	sessionId: string,
	moduleId: string,
	title: string,
	description: string,
	durationInMins: number,
	sequence: number,
	contentType: string,
	resourceLink: string,
	imageUrl: string
) => {
	const body = {
		ModuleId: moduleId,
		Title: title,
		Description: description ? description : null,
		DurationInMins: durationInMins ? durationInMins : null,
		Sequence: sequence ? sequence : null,
		ImageUrl: imageUrl ? imageUrl : null,
		ContentType: contentType ? contentType : null,
		ResourceLink: resourceLink
	};
	const url = BACKEND_API_URL + '/educational/course-contents';
	return await post_(sessionId, url, body, true);
};

export const getCourseContentById = async (sessionId: string, contentId: string) => {
	const url = BACKEND_API_URL + `/educational/course-contents/${contentId}`;
	return await get_(sessionId, url, true);
};

export const searchCourseContents = async (sessionId: string, searchParams?: any) => {
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
	const url = BACKEND_API_URL + `/educational/course-contents/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateCourseContent = async (
	sessionId: string,
	moduleId: string,
	contentId: string,
	title: string,
	description: string,
	durationInMins: number,
	sequence: number,
	contentType: string,
	resourceLink: string,
	imageUrl: string
) => {
	const body = {
		ModuleId: moduleId,
		Title: title,
		Description: description ? description : null,
		DurationInMins: durationInMins ? durationInMins : null,
		Sequence: sequence ? sequence : null,
		ImageUrl: imageUrl ? imageUrl : null,
		ContentType: contentType ? contentType : null,
		ResourceLink: resourceLink
	};
	const url = BACKEND_API_URL + `/educational/course-contents/${contentId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteCourseContent = async (sessionId: string, contentId: string) => {
	const url = BACKEND_API_URL + `/educational/course-contents/${contentId}`;
	return await delete_(sessionId, url, true);
};
