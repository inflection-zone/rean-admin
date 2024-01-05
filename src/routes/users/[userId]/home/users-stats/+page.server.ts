import { error, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDailyStatistics } from '$routes/api/services/statistics';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    const response = await getDailyStatistics(sessionId);
    if (!response) {
        throw error(404, 'Daily user statistics data not found');
    }

    const overallUsersData = response.Data.DailyStatistics.Statistics.UserStatistics.UsersCountStats;
    const ageWiseUsers = response.Data.DailyStatistics.Statistics.UserStatistics.AgeWiseUsers;
    const genderWiseUsers = response.Data.DailyStatistics.Statistics.UserStatistics.GenderWiseUsers;
    const maritalStatusWiseUsers = response.Data.DailyStatistics.Statistics.UserStatistics.MaritalStatusWiseUsers;
    const countryWiseUsers = response.Data.DailyStatistics.Statistics.UserStatistics.CountryWiseUsers;
    const majorAilment = response.Data.DailyStatistics.Statistics.UserStatistics.MajorAilmentDistribution;
    const addictionDistribution = response.Data.DailyStatistics.Statistics.UserStatistics.AddictionDistribution;
    const deviceDetailWiseUsers = response.Data.DailyStatistics.Statistics.UserStatistics.DeviceDetailWiseUsers;
    const years = [];
    const yearWiseUserCount = response.Data.DailyStatistics.Statistics.UserStatistics.YearWiseUserCount;
    yearWiseUserCount.forEach((value) => {
        years.push({
            year: value.Year
        });
    });
    console.log('###', years);
    console.log('overallUsersData', overallUsersData);
    console.log('ageWiseUsers', ageWiseUsers);
    console.log('genderWiseUsers', genderWiseUsers);
    console.log('maritalStatusWiseUsers', maritalStatusWiseUsers);
    console.log('addictionDistribution', addictionDistribution);
    console.log('deviceDetailWiseUsers', deviceDetailWiseUsers);

    return {
        sessionId,
        ageWiseUsers,
        genderWiseUsers,
        maritalStatusWiseUsers,
        countryWiseUsers,
        majorAilment,
        addictionDistribution,
        overallUsersData,
        deviceDetailWiseUsers,
        years
    };
};
