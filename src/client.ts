// thaw-mongodb-client-web/src/client.ts

import { ifDefinedThenElse } from 'thaw-common-utilities.ts';

import { IHttpJsonClient, IMongoDBClient, IMongoDBDatabase } from 'thaw-types';

import { createDatabase } from './database';

class MongoDBClient implements IMongoDBClient {
	constructor(
		private readonly httpJsonClient: IHttpJsonClient,
		private readonly serverUrl: string
	) {}

	public async connect(): Promise<IMongoDBClient> {
		// No-op.

		return this;
	}

	public async destroy(): Promise<void> {
		// No-op.
	}

	public getDatabase(databaseName: string): IMongoDBDatabase {
		return createDatabase(this.httpJsonClient, this.serverUrl, databaseName);
	}
}

export function createWebMongoDBClient(
	httpJsonClient: IHttpJsonClient,
	options: {
		https?: boolean;
		server?: string;
		port?: number;
	} = {}
): IMongoDBClient {
	const isHttps = ifDefinedThenElse(options.https, true);
	const protocol = isHttps ? 'https' : 'http';
	const defaultPort = isHttps ? 443 : 80;
	const serverUrl = `${protocol}://${ifDefinedThenElse(
		options.server,
		'localhost'
	)}:${ifDefinedThenElse(options.port, defaultPort)}`;

	return new MongoDBClient(httpJsonClient, serverUrl);
}
