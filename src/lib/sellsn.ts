// Below are the IDENTIFY models for TS

/**
 * The payload sent by SellSN during the IDENTITFY process of integration setup.
 */
export interface IntegrationIdentifyRequest {
	/**
	 * The ID of the user on SellSN, use this to tie it up to your own user object.
	 */
	userId: string;
}

/**
 * The result you must send SellSN during the IDENTIFY process of integration setup
 */
export interface IntegrationIdentifyResponse {
	/**
	 * The ID of the user on your platform, SellSN will attach this to the user and use it in
	 * the create order endpoint and to help identify them on your own platform.
	 */
	userId: string;
}

// Below are the order creation results and responses

/**
 * The payload sent by SellSN whenever a customer creates an order using your custom payment method
 */
export interface IntegrationOrderRequest {
	/**
	 * The total amount of the order to be paid.
	 */
	cost: number;

	/**
	 * The 3-letter ISO 4217 fiat currency code to use when creating the order.
	 */
	currency: string;

	/**
	 * The ID of the order on SellSN.
	 */
	orderId: string;

	/**
	 * The email address of the customer.
	 */
	email: string;

	/**
	 * The ID of the merchant account on SellSN who is using the custom payment integration.
	 */
	userId: string;

	/**
	 * The IP address of the customer.
	 */
	ipAddress: string;

	/**
	 * The browser user agent value of the customer, this contains the browser
	 * and sometimes the device and operating system the customer is using.
	 */
	userAgent: string;

	/**
	 * The 2-letter ISO 3166-1 alpha-2 country code the customer is from, based on their IP address.
	 */
	countryCode: string;

	/**
	 * The ID of the payment method the customer is using, this is always
	 * going to be the value of the 'id' field on your custom payment integration schema.
	 */
	paymentMethod: string;
}

export interface IntegrationOrderResponse {
	/**
	 * The ID of the order on your platform, SellSN will attach this to the order and use it in
	 * the order status endpoint and to help identify them on your own platform.
	 */
	id: string;
	/**
	 * The URL the customer should go to in-order to complete the payment.
	 */
	link: string;
}
