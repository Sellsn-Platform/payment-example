import { getOrder, sendWebhook } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const order = getOrder(params.id);
	if (!order) {
		error(404, 'Order not found');
	}

	return {
		...order
	};
};

export const actions: Actions = {
	default: async ({ params }) => {
		const orderId = params.id;
		const order = getOrder(orderId);
		if (!order) {
			error(404, 'Order not found');
		}

		// Send WH
		await sendWebhook(order);
		return {
			success: true
		};
	}
};
