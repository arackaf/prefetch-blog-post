import { executeQuery } from '$lib/dbUtils.js';
import { json } from '@sveltejs/kit';

export async function GET({ url, setHeaders, locals }) {
	const publicUser = '573d1b97120426ef0078aa92';

	const booksPacket = await executeQuery(
		`
    SELECT * 
    FROM books
    WHERE userId = '${publicUser}'
    ORDER BY id DESC
    LIMIT 50 
  `
	);

	await new Promise(res => setTimeout(res, 400));
	return json(booksPacket);
}
