import { executeQuery } from '$lib/dbUtils.js';
import { json } from '@sveltejs/kit';

export async function GET({ url, setHeaders, locals }) {
	const publicUser = '573d1b97120426ef0078aa92';

	const booksPacket = await executeQuery(
		`
    SELECT count(*) count 
    FROM books
    WHERE userId = '${publicUser}'
  `
	);

	await new Promise(res => setTimeout(res, 300));
	return json(booksPacket[0]);
}
