<script lang="ts">
	import type { BookImages, PreviewPacket } from '$lib/types';

	type Sizes = 'mobile' | 'small' | 'medium';
	type BookImagesPassed = Partial<BookImages>;

	export let style = '';
	export let url: string | null = null;
	export let book: BookImagesPassed | null = null;

	export let preview: string | PreviewPacket | null = null;
	export let noCoverMessage: string = 'No Cover';
	export let imgClasses = '';

	let previewToUse: string | PreviewPacket | null;
	$: {
		if (preview != null) {
			previewToUse = preview;
		} else if (book) {
			previewToUse = book.smallImagePreview!;
		}
	}

	$: previewString =
		previewToUse == null ? '' : typeof previewToUse === 'string' ? previewToUse : previewToUse.b64;
	$: sizingStyle =
		previewToUse != null && typeof previewToUse === 'object'
			? `width:${previewToUse.w}px;height:${previewToUse.h}px`
			: '';

	$: urlToUse = getUrlToUse(book, url, sizingStyle);

	function getUrlToUse(book: BookImagesPassed | null, url: string | null, sizingStyle: string) {
		if (!book) {
			return url;
		}
		// we know the exact size
		if (sizingStyle) {
			return book.smallImage;
		} else {
			return book.smallImage;
		}
	}

	let noCoverClasses: string = '';
	let noCoverCommonClasses = 'bg-primary-4 text-primary-9 text-center';
	$: {
		noCoverClasses = noCoverCommonClasses + ' ';
		noCoverClasses += 'w-[50px] h-[65px] pt-2 text-sm';
	}
</script>

<div class="overlay-holder overflow-hidden" style={style + sizingStyle}>
	{#if previewString}
		<span
			class="z-[1] blur-sm"
			style={`background: url('${previewString}') no-repeat; background-size: cover; ${sizingStyle}`}
		/>
	{/if}
	{#if urlToUse}
		<img class="z-[2] {imgClasses}" alt="Book cover" src={urlToUse} style={sizingStyle} />
	{:else}
		<div class={noCoverClasses}>
			<div>{noCoverMessage}</div>
		</div>
	{/if}
</div>
