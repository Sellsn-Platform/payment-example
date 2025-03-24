<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="container p-4">
	{@render children()}
</div>
