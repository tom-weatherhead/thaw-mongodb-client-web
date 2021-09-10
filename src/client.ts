// thaw-mongodb-client-direct/src/cliient.ts

import { ifDefinedThenElse } from 'thaw-common-utilities.ts';

import { IHttpJsonClient, IMongoDBClient, IMongoDBCollection } from 'thaw-types';

import { createCollection } from './collection';

interface IMongoDBDatabase {
	getCollection(collectionName: string): IMongoDBCollection;
}

function createDatabase(
	httpJsonClient: IHttpJsonClient,
	serverUrl: string,
	databaseName: string
): IMongoDBDatabase {
	return {
		getCollection: (collectionName: string) =>
			createCollection(httpJsonClient, `${serverUrl}/${databaseName}/${collectionName}`)
	};
}

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

	public getCollection(databaseName: string, collectionName: string): IMongoDBCollection {
		// if (this.isClientDestroyed) {
		// 	throw new Error('getCollection() : The connection has already been destroyed');
		// } else if (!this.isClientConnected) {
		// 	throw new Error('getCollection() : The client is not connected');
		// }
		//
		// return createCollection(this.mongoClient, databaseName, collectionName);

		return createCollection(
			this.httpJsonClient,
			`${this.serverUrl}/${databaseName}/${collectionName}`
		);
	}
}

// Should we have three layers? :
// 1) IMongoDBClient -> I.e. Specific to one MongoDB server; not specific to one database
// 2) IMongoDBDatabase -> This is currently absent.
// 3) IMongoDBCollection

export function createWebMongoDBClient(
	httpJsonClient: IHttpJsonClient,
	options: {
		https?: boolean;
		server?: string;
		port?: number;
		// databaseName: string;
	}
): IMongoDBClient {
	const isHttps = ifDefinedThenElse(options.https, true);
	const protocol = isHttps ? 'https' : 'http';
	const defaultPort = isHttps ? 443 : 80;
	const serverUrl = `${protocol}://${ifDefinedThenElse(
		options.server,
		'localhost'
	)}:${ifDefinedThenElse(options.port, defaultPort)}`;
	// )}:${ifDefinedThenElse(options.port, defaultPort)}/${options.databaseName}`;

	return new MongoDBClient(httpJsonClient, serverUrl);
}
