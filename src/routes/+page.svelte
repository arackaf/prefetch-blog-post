<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		fetch('/api/books')
			.then((resp) => resp.json())
			.then((books) => {
				debugger;
			});
	});
</script>
