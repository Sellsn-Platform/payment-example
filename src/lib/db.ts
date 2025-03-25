import type { IntegrationOrderRequest } from './sellsn';
import crypto from 'crypto';

/**
 * This is a simple in-memory database for the demo.
 * In a production system, you would use a proper database.
 *
 * The intention of this file is to provide a simple polyfill for user authentication, authorization
 * and order creation and retrieval for the purposes of the demo.
 *
 * In a production system, you would use a proper authentication and authorization system, such as
 * OAuth, JWT, etc.
 */

export interface User {
	id: string;
	email: string;
	name: string;
	apiKey: string;
	webhookSecret: string;
	sellsnUserId?: string;
}

const orders: IntegrationOrderRequest[] = [];
const users: User[] = [
	{
		id: '1',
		email: 'test@example.com',
		apiKey: 'testapikey',
		name: 'Test User',
		webhookSecret: 'testwebhooksignature'
	}
];

function generateHmacSignature(body: string, secret: string): string {
	return crypto.createHmac('sha256', secret).update(body).digest('hex'); // <- HEX encoded!
}

export function getOrder(orderId: string): IntegrationOrderRequest | undefined {
	return orders.find((order) => order.orderId === orderId);
}

export function createOrder(order: IntegrationOrderRequest) {
	orders.push(order);
}

export function getUser(userId: string): User | undefined {
	return users.find((user) => user.id === userId);
}

export function getUserByApiKey(apiKey: string): User | undefined {
	return users.find((user) => user.apiKey === apiKey);
}

export function updateUser(user: User) {
	const index = users.findIndex((u) => u.id === user.id);
	if (index === -1) {
		users.push(user);
	} else {
		users[index] = user;
	}
}

export function deleteUser(userId: string) {
	const index = users.findIndex((user) => user.id === userId);
	if (index === -1) {
		return;
	}
	users.splice(index, 1);
}

export async function sendWebhook(order: IntegrationOrderRequest) {
	// The 1 is the USER ID on SELLSN, you should've binded it to the user properly
	const user = getUser('1'); // Hardcoded cus lazy
	console.log(user);
	const url = `http://localhost:5140/user/customPaymentIntegration/webhook/${user?.sellsnUserId}`;
	const body = {
		orderId: order.orderId,
		status: 'Delivered',
		amountPaid: order.cost,
		paymentMethod: 'example' // payment method ID, this is present in your INTEGRATION SCHEMA
	};

	const json = JSON.stringify(body);

	await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Webhook-Signature': generateHmacSignature(json, user?.webhookSecret || '')
		},
		body: json
	});

	console.log('Webhook sent');
}
