// thaw-mongodb-client-web/src/database.ts

import { IHttpJsonClient, IMongoDBDatabase } from 'thaw-types';

import { createCollection } from './collection';

export function createDatabase(
	httpJsonClient: IHttpJsonClient,
	serverUrl: string,
	databaseName: string
): IMongoDBDatabase {
	return {
		getCollection: (collectionName: string) =>
			createCollection(httpJsonClient, `${serverUrl}/${databaseName}/${collectionName}`)
	};
}
