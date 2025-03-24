<script>
	import { page } from '$app/state';
</script>

<h1 class="text-xl font-bold">Checkout</h1>
<p class="mb-6 border-b border-b-zinc-400">
	Example checkout page for <code>{page.params.id}</code>
</p>

<p>
	<b>Cost: </b>{page.data.cost}
	{page.data.currency}
	<b>Email: </b>{page.data.email}
	<b>IP address: </b>{page.data.ipAddress}
	<b>User Agent: </b>{page.data.userAgent}
	<b>Country code: </b>{page.data.countryCode}
	<b>Payment method: </b>{page.data.paymentMethod}
</p>

<p class="my-4 italic opacity-50">
	<strong>Note:</strong> This is just an example, you should not use this as is.
</p>

<p>
	<a href="/">Go back</a>
</p>
