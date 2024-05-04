import { MYSQL_CONNECTION_STRING } from '$env/static/private';

import { Client, type Connection } from '@planetscale/database';

export const mySqlConnectionFactory = new Client({
	url: MYSQL_CONNECTION_STRING
});

export const executeSQLRaw = async (
	sql: string,
	args: any[] = []
): ReturnType<Connection['execute']> => {
	const conn = mySqlConnectionFactory.connection();
	return conn.execute(sql, args);
};

export const executeQuery = async <T = unknown>(sql: string, args: any[] = []): Promise<T[]> => {
	const resultRaw = await executeSQLRaw(sql, args);
	return resultRaw.rows as T[];
};
