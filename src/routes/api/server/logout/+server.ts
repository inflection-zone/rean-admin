import { CookieUtils } from '$lib/utils/cookie.utils';
import { SessionManager } from '../../session.manager';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { logout } from '../../services/user';

////////////////////////////////////////////////////////////////

export const POST = async (event: RequestEvent) => {
	const sessionId = event.cookies.get('sessionId');
	try {
		console.log('Logging out...');
		const response = await logout(sessionId);
		console.log('response', JSON.stringify(response));
		if (sessionId) {
			const session = await SessionManager.removeSession(sessionId);
			console.log(JSON.stringify(session, null, 2));
		}
		CookieUtils.removeCookieHeader(event, 'sessionId');
		throw redirect(303, `/`);
	} catch (err) {
		console.error(`Error logging out: ${err.message}`);
		return new Response(err.message);
	}
};
