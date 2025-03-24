import { getOrder } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const order = getOrder(params.id);
	if (!order) {
		error(404, 'Order not found');
	}

	return {
		...order
	};
};
