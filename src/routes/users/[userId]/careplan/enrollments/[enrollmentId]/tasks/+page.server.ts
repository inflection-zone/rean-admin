import type { RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { searchEnrollmentTask } from '$routes/api/services/careplan/enrollment.task';
import { getEnrollmentById } from '$routes/api/services/careplan/enrollment';
import { searchParticipantActivities } from '$routes/api/services/careplan/participant.activity.response';

////////////////////////////////////////////////////////////////////////////

export const load: PageServerLoad = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		const enrollmentId = event.params.enrollmentId;
		const response = await getEnrollmentById(sessionId, enrollmentId);
		if (response.Status === 'failure' || response.HttpCode !== 200) {
			throw error(response.HttpCode, response.Message);
		}
	
		const enrollment = response.Data;
		console.log("enrollment", enrollment);
		const participantId = enrollment.ParticipantId;
		const careplanId = enrollment.CareplanId;
		const searchParams ={
			careplanId :careplanId,
			participantId: participantId
		}
		const enrollmentTask_ = await searchEnrollmentTask(sessionId, searchParams);
		const participantResponse_ = await searchParticipantActivities(sessionId, participantId);
		const enrollmentTask = enrollmentTask_.Data;
		const participantResponse = participantResponse_.Data.Items;
		return {
			enrollmentTask,
			enrollment,
			participantResponse
		};
	} catch (error) {
		console.error(`Error retriving enrollment data: ${error.message}`);
	}
};
