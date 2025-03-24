import { createOrder, getUserByApiKey } from '$lib/db';
import type { IntegrationOrderRequest, IntegrationOrderResponse } from '$lib/sellsn';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	// Auth logic
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

	// Parse the request body
	const data: IntegrationOrderRequest = await request.json();

	// Add the order directly to DB, you might want to do whatever processing in your backend for this
	// and then return the orderId and URL to SellSN
	createOrder(data);

	const result: IntegrationOrderResponse = {
		orderId: data.orderId,
		link: `http://localhost:5173/checkout/${data.orderId}`
	};

	return new Response(JSON.stringify(result), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
