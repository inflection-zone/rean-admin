import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getEnrollmentById, getEnrollmentStats } from '$routes/api/services/careplan/enrollment';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad  = async (event: RequestEvent) => {
    const sessionId = event.cookies.get('sessionId');
    console.log('sessionId', sessionId);
    try {
        const enrollmentId = event.params.enrollmentId;
        console.log(enrollmentId);
        const response = await getEnrollmentById(sessionId, enrollmentId);
        if (response.Status === 'failure' || response.HttpCode !== 200) {
            throw error(response.HttpCode, response.Message);
        }
        const enrollment = response.Data;
        const participantId = enrollment.ParticipantId;
        const _enrollmentTasks = await getEnrollmentStats(sessionId,participantId);
        const enrollmentStats = _enrollmentTasks.Data;
        console.log("participantId",participantId)
        console.log('Enrollment',enrollment);    
        console.log(`Enrollment tasks = ${JSON.stringify(enrollmentStats)}`);
            return {
                enrollment,
                enrollmentStats,
                message: response.Message
            }
    }
    catch (error) {
        console.error(`Error retriving enrollment data: ${error.message}`);
    }
}