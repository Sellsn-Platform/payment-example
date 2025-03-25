import { getOrder, getUserByApiKey } from '$lib/db';
import type { IntegrationOrderResponse } from '$lib/sellsn';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, request }) => {
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

	const order = getOrder(params.id);
	if (!order) {
		return new Response(
			JSON.stringify({
				error: 'Order not found'
			}),
			{
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}

	const result: IntegrationOrderResponse = {
		id: order.orderId,
		link: `http://localhost:5170/checkout/${order.orderId}`
	};

	return new Response(JSON.stringify(result), {
		status: 200,
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
