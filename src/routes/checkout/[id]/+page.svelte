<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
</script>

<h1 class="text-xl font-bold">Checkout</h1>
<p class="mb-6 border-b border-b-zinc-400">
	Example checkout page for <code>{page.params.id}</code>
</p>

<p>
	<b>Cost: </b>{page.data.cost}
	{page.data.currency}<br />
	<b>Email: </b>{page.data.email}<br />
	<b>IP address: </b>{page.data.ipAddress}<br />
	<b>User Agent: </b>{page.data.userAgent}<br />
	<b>Country code: </b>{page.data.countryCode}<br />
	<b>Payment method: </b>{page.data.paymentMethod}<br />
</p>

<p class="my-4 italic opacity-50">
	<strong>Note:</strong> This is just an example, you should not use this as is.
</p>

<form method="post" use:enhance>
	<button type="submit" class="rounded-md bg-white px-2 py-1 text-black"
		>Mark as paid, send webhook</button
	>
</form>

<p>
	<a href="/">Go back</a>
</p>
