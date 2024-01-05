import { BACKEND_API_URL } from '$env/static/private';
import { get_ } from './common';

////////////////////////////////////////////////////////////////

// export const getTolalUsers = async (sessionId: string, searchParams?: any) => {
// 	let searchString = '';
// 	if (searchParams) {
// 		const keys = Object.keys(searchParams);
// 		if (keys.length > 0) {
// 			searchString = '?';
// 			const params = [];
// 			for (const key of keys) {
// 				if (searchParams[key]) {
// 					const param = `${key}=${searchParams[key]}`;
// 					params.push(param);
// 				}
// 			}
// 			searchString  += params.join('&');
// 		}
// 	}
// 	const url = BACKEND_API_URL + `/users-statistics/users${searchString}`;
//   console.log("url", url)
// 	return await get_(sessionId, url, true);
// };
// export const getActiveUsers = async (sessionId: string, searchParams?: any) => {
// 	let searchString = '';
// 	if (searchParams) {
// 		const keys = Object.keys(searchParams);
// 		if (keys.length > 0) {
// 			searchString = '?';
// 			const params = [];
// 			for (const key of keys) {
// 				if (searchParams[key]) {
// 					const param = `${key}=${searchParams[key]}`;
// 					params.push(param);
// 				}
// 			}
// 			searchString  += params.join('&');
// 		}
// 	}
// 	const url = BACKEND_API_URL + `/users-statistics/active-users${searchString}`;
// 	return await get_(sessionId, url, true);
// };

export const getGenderWiseUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/by-genders${searchString}`;
	return await get_(sessionId, url, true);
};

export const getAgeWiseUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/by-ages${searchString}`;
	return await get_(sessionId, url, true);
};

export const getMaritalStatusWiseUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/by-marital-statuses${searchString}`;
	return await get_(sessionId, url, true);
};

export const getDeviceDetailWiseUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/by-device-details${searchString}`;
	return await get_(sessionId, url, true);
};

// export const getDeletdUsers = async (sessionId: string, searchParams?: any) => {
// 	let searchString = '';
// 	if (searchParams) {
// 		const keys = Object.keys(searchParams);
// 		if (keys.length > 0) {
// 			searchString = '?';
// 			const params = [];
// 			for (const key of keys) {
// 				if (searchParams[key]) {
// 					const param = `${key}=${searchParams[key]}`;
// 					params.push(param);
// 				}
// 			}
// 			searchString  += params.join('&');
// 		}
// 	}
// 	const url = BACKEND_API_URL + `/users-statistics/deleted-users${searchString}`;
// 	return await get_(sessionId, url, true);
// };

export const getEnrollmetUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/by-enrollments${searchString}`;
	return await get_(sessionId, url, true);
};

export const getAppDownloadsData = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/app-downloads${searchString}`;
	return await get_(sessionId, url, true);
};

export const getCountryWiseUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/by-countries${searchString}`;
	return await get_(sessionId, url, true);
};

export const getMajorAilment = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/by-major-ailments${searchString}`;
	return await get_(sessionId, url, true);
};

export const getObesityDistribution = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/by-obesities${searchString}`;
	return await get_(sessionId, url, true);
};

export const getOverallUsers = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/users-count${searchString}`;
	return await get_(sessionId, url, true);
};

export const getDailyStatistics = async(sessionId:string)=>{
	const url = BACKEND_API_URL + `/daily-stats`;
	return await get_(sessionId, url, true);
}

export const getAddictionDistribution = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/by-addictions${searchString}`;
	return await get_(sessionId, url, true);
};

export const getHealthPillarDistribution = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/by-health-pillars${searchString}`;
	return await get_(sessionId, url, true);
};

export const getRoleDistribution = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/by-roles${searchString}`;
	return await get_(sessionId, url, true);
};

export const getBiometricsDistribution = async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/by-biometrics${searchString}`;
	return await get_(sessionId, url, true);
};

export const getUsersStats= async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/users-stats${searchString}`;
	return await get_(sessionId, url, true);
};

export const getYears= async (sessionId: string, searchParams?: any) => {
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
			searchString  += params.join('&');
		}
	}
	const url = BACKEND_API_URL + `/users-statistics/years`;
	return await get_(sessionId, url, true);
};