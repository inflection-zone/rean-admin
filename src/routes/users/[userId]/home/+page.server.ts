import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import {
	getAppDownloadsData,
	getDeviceDetailWiseUsers,
	// getEnrollmetUsers,
	getOverallUsers,
	getYears
} from '$routes/api/services/statistics';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const _overallUsersData = await getOverallUsers(sessionId);
		const _deviceDetailWiseUsers = await getDeviceDetailWiseUsers(sessionId);
		// const _enrollmentUsers = await getEnrollmetUsers(sessionId);
		const _appDownloadsData = await getAppDownloadsData(sessionId);
		const _years = await getYears(sessionId);
		const overallUsersData = _overallUsersData.Data.UsersCountStats;
		const deviceDetailWiseUsers_ = _deviceDetailWiseUsers.Data.DeviceDetailWiseUsers;
		const deviceDetailWiseUsers = deviceDetailWiseUsers_.map(item => {
			if (item.OSType === 'aaa') {
				return { OSType: 'Missing device detail', count: item.count };
			}
			return item;
		});
		// const enrollmentUsers = _enrollmentUsers.Data.EnrollmentUsers;

		let years = _years.Data.Years;
		const appDownloadsData = _appDownloadsData.Data.AppDownload;

		let appDownloadCount = 0;

		if (appDownloadsData.rows.length > 0) {
			const latestEntry = latestDownloadEnrty(appDownloadsData);
			 appDownloadCount = latestEntry.TotalDownloads;
		}

		const yearsArray = [];
		years =	years.sort((a, b) => a.year - b.year);
		for (const year of years) {
			const year_ = year.year;
			yearsArray.push(year_);
		}

		const totalUsersArray = [];
		for (const y of yearsArray) {
			const searchParams = {
				year: y
			};
			const _totalUsers = await getOverallUsers(sessionId, searchParams);
			const totalUsers = _totalUsers.Data.UsersCountStats.TotalUsers.Count;
			totalUsersArray.push(totalUsers);
		}

		const androidUsersArray = [];

		const iOSUsersArray = [];
		for (const y of yearsArray) {
			const searchParams = {
				year: y
			};
			const _deviceDetailWiseUsers = await getDeviceDetailWiseUsers(sessionId, searchParams);

			const deviceDetails = _deviceDetailWiseUsers.Data.DeviceDetailWiseUsers;
			console.log('deviceDetails----', deviceDetails);
			for (const deviceDetail of deviceDetails )
			if (deviceDetail.OSType === 'iOS'){
				iOSUsersArray.push(deviceDetail.count)
			}
			else if (deviceDetail.OSType === 'Android'){
				androidUsersArray.push(deviceDetail.count)
			}
		}

		console.log('appDownloadsData', appDownloadCount);
		console.log('deviceDetailWiseUsers', deviceDetailWiseUsers);
		console.log('overallUsersData', overallUsersData);
		// console.log('enrollmentUsers', enrollmentUsers);
		console.log('years', years);
		return {
			sessionId,
			deviceDetailWiseUsers,
			androidUsersArray,
			totalUsersArray,
			iOSUsersArray,
			yearsArray,
			// enrollmentUsers,
			appDownloadCount,
			overallUsersData
		};
	} catch (error) {
		console.error(`Error retriving users data: ${error.message}`);
	}

	function latestDownloadEnrty(appDownloadsData) {
		return appDownloadsData.rows.reduce((latest, current) => {
			const latestTimestamp = latest ? new Date(latest.CreatedAt).getTime() : 0;
			const currentTimestamp = new Date(current.CreatedAt).getTime();
			return currentTimestamp > latestTimestamp ? current : latest;
		}, null);
	}
};
