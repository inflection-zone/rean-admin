import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { SessionManager } from '../../api/session.manager';

////////////////////////////////////////////////////////////////

export const load: LayoutServerLoad = async (event) => {
	const sessionId = event.cookies.get('sessionId');
	const session = await SessionManager.getSession(sessionId);

	if (!session) {
		throw redirect(307, '/');
	}
	console.log(`session received`);

	const sessionUser = {
		sessionId: session.sessionId,
		userId: session.userId,
		email: session.email,
		username: session.username,
		fullName: session.fullName,
		firstName: session.firstName,
		roleId: session.roleId
	};
	return sessionUser;
};
