import { getUserByApiKey, updateUser } from '$lib/db';
import type { IntegrationIdentifyRequest, IntegrationIdentifyResponse } from '$lib/sellsn';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const apiKey = request.headers.get('Authorization');
	const user = getUserByApiKey(apiKey ?? '');
	if (!user) {
		return new Response(
			JSON.stringify({
				error: 'Unauthorized'
			}),
			{
				status: 401,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}

	const data: IntegrationIdentifyRequest = await request.json();

	// Update the user and tie the SellSN ID to the user
	user.sellsnUserId = data.userId;
	updateUser(user);

	const result: IntegrationIdentifyResponse = {
		userId: user.id
	};

	return new Response(JSON.stringify(result), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
