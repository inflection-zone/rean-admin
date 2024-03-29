import type {  RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getActiveUsers, getAddictioDistribution, getAgeWiseUsers, getBiometricsDistribution, getCountryWiseUsers, getGenderWiseUsers, getHealthPillarDistribution, getMajorAilment, getMaritalStatusWiseUsers, getObesityDistribution, getRoleDistribution, getTolalUsers } from '$routes/api/services/statistics';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
    const years = ["2020", "2021", "2022", "2023"];
    const ageWiseUsersArray = []
    for(const y of years){
     const searchParams = {
        year: y,
      }
      const _ageWiseUsers = await getAgeWiseUsers(sessionId,searchParams);
      const genderWiseUsers = _ageWiseUsers.Data.AgeWiseUsers;
      ageWiseUsersArray.push(genderWiseUsers);
    }


    const searchParams = {
      year : '2023'
    }
		const _totalUsers = await getTolalUsers(sessionId);
    const _activeUsers = await getActiveUsers(sessionId);
    const _ageWiseUsers = await getAgeWiseUsers(sessionId);
    const _genderWiseUsers = await getGenderWiseUsers(sessionId);
    const _maritalStatusWiseUsers = await getMaritalStatusWiseUsers(sessionId);
    const _countryWiseUsers = await getCountryWiseUsers(sessionId);
    const _majorAilment = await getMajorAilment(sessionId);
    const _obesityDistribution = await getObesityDistribution(sessionId);
    const _addictionDistribution = await getAddictioDistribution(sessionId);
    const _healthPillarDistribution = await getHealthPillarDistribution(sessionId);
    const _healthPillarDistributionMonthly = await getHealthPillarDistribution(sessionId, searchParams);
    const _roleDistribution = await getRoleDistribution(sessionId);
    const _biometricsDistribution = await getBiometricsDistribution(sessionId);
    const _biometricsDistributionMonthly = await getBiometricsDistribution(sessionId, searchParams);

    const totalUsers = _totalUsers.Data.TotalUsers;
    const activeUsers = _activeUsers.Data.ActiveUsers;
    const ageWiseUsers = _ageWiseUsers.Data.AgeWiseUsers;
    const genderWiseUsers  = _genderWiseUsers.Data.GenderWiseUsers;
    const maritalStatusWiseUsers  = _maritalStatusWiseUsers.Data.MaritalStatusWiseUsers;
    const countryWiseUsers  = _countryWiseUsers.Data.CountryWiseUsers;
    const majorAilment  = _majorAilment.Data.MajorAilmentDistribution;
    const obesityDistribution  = _obesityDistribution.Data.ObesityDistribution;
    const addictionDistribution  = _addictionDistribution.Data.AddictionDistribution;
    const healthPillarDistribution  = _healthPillarDistribution.Data.HealthPillarDistribution;
    const healthPillarDistributionMonthly  = _healthPillarDistributionMonthly.Data.HealthPillarDistribution;
    const roleDistribution  = _roleDistribution.Data.RoleDistribution;
    const biometricsDistribution  = _biometricsDistribution.Data.Biometrics;
    const biometricsDistributionMonthly  = _biometricsDistributionMonthly.Data.Biometrics;

    console.log("totalUsers",totalUsers);
    console.log("activeUsers",activeUsers);
    console.log("ageWiseUsers",ageWiseUsers);
    console.log("genderWiseUsers",genderWiseUsers);
    console.log("maritalStatusWiseUsers",maritalStatusWiseUsers);
    console.log("obesityDistribution",obesityDistribution);
    console.log("addictionDistribution",addictionDistribution);
    console.log("healthPillarDistributionMonthly",healthPillarDistributionMonthly);
    console.log("roleDistribution",roleDistribution);

		return {
      sessionId,
			totalUsers,
      activeUsers,
      ageWiseUsers,
      genderWiseUsers,
      maritalStatusWiseUsers,
      countryWiseUsers,
      majorAilment,
      obesityDistribution,
      addictionDistribution,
      healthPillarDistribution,
      healthPillarDistributionMonthly,
      roleDistribution,
      biometricsDistribution,
      biometricsDistributionMonthly
		};
    
	} catch (error) {
		console.error(`Error retriving users data: ${error.message}`);
	}
};
