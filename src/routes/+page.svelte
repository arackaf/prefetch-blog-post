<script lang="ts">
	import type { Book } from '$lib/types';
	import BookCover from '$lib/BookCover.svelte';
	import { onMount } from 'svelte';

	let books: Book[] | null = null;
	let count: number | null = null;

	onMount(() => {
		fetch('/api/books')
			.then(resp => resp.json())
			.then(booksResp => {
				books = booksResp;
			});
	});

	onMount(() => {
		fetch('/api/books-count')
			.then(resp => resp.json())
			.then(countResp => {
				count = countResp.count;
			});
	});
</script>

{#if books && count != null}
	<div class="m-8">
		<h1 class="mb-3 text-lg">You have {count} book{count === 1 ? '' : 's'}</h1>
		<div class="flex flex-col gap-3">
			{#each books as book}
				<div class="flex gap-4">
					<BookCover {book} />
					<div class="flex flex-col">
						<span class="leading-none text-base">{book.title}</span>
						<span class="text-sm italic">{(book.authors ?? []).join(', ')}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="m-8">
		<h1>Loading...</h1>
	</div>
{/if}
