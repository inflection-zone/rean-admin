import { BACKEND_API_URL } from '$env/static/private';
import { delete_, get_, post_, put_ } from './common';

////////////////////////////////////////////////////////////////

export const createCourse = async (
	sessionId: string,
	name: string,
	description: string,
	durationInDays: number,
	imageUrl: string,
) => {
	const body = {
		Name: name,
		Description: description ? description : null,
		DurationInDays: durationInDays ? durationInDays : null,
		ImageUrl: imageUrl ? imageUrl : null,
	};
	const url = BACKEND_API_URL + '/educational/courses';
	return await post_(sessionId, url, body, true);
};

export const getCourseById = async (sessionId: string, courseId: string) => {
	const url = BACKEND_API_URL + `/educational/courses/${courseId}`;
	return await get_(sessionId, url, true);
};

export const searchCourses = async (sessionId: string, searchParams?) => {
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
	const url = BACKEND_API_URL + `/educational/courses/search${searchString}`;
	return await get_(sessionId, url, true);
};

export const updateCourse = async (
	sessionId: string,
	courseId: string,
	name: string,
	description: string,
	durationInDays: number,
	imageUrl: string,
) => {
	const body = {
		courseId,
		Name: name,
		Description: description ? description : null,
		DurationInDays: durationInDays ? durationInDays : null,
		ImageUrl: imageUrl ? imageUrl : null,
	};
	const url = BACKEND_API_URL + `/educational/courses/${courseId}`;
	return await put_(sessionId, url, body, true);
};

export const deleteCourse = async (sessionId: string, courseId: string) => {
	const url = BACKEND_API_URL + `/educational/courses/${courseId}`;
	return await delete_(sessionId, url, true);
};
