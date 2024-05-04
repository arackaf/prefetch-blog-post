<script lang="ts">
	import type { Book } from '$lib';
	import { onMount } from 'svelte';

	let books: Book[] = [];

	onMount(() => {
		fetch('/api/books')
			.then((resp) => resp.json())
			.then((booksResp) => {
				books = booksResp;
			});
	});
</script>

<div class="flex flex-col gap-2">
	{#each books as book}
		<span>{book.title}</span>
	{/each}
</div>
