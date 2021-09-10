// thaw-mongodb-client-web/src/collection.ts

import { IHttpJsonClient, IMongoDBCollection } from 'thaw-types';

class MongoDBCollection implements IMongoDBCollection {
	constructor(
		private readonly httpJsonClient: IHttpJsonClient,
		private readonly collectionUrl: string
	) {}

	public async createOne(dataToInsert: unknown): Promise<unknown> {
		// return await this.collection.insertOne(dataToInsert);

		return await this.httpJsonClient.post(this.collectionUrl, dataToInsert).toPromise();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async read(criteria = {}): Promise<unknown[]> {
		// const cursor = this.collection.find(criteria);
		//
		// return await cursor.toArray();
		throw new Error('MongoDBCollection.()');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async readOneById(id: string): Promise<unknown> {
		// return this.collection.findOne(critter(id));
		throw new Error('MongoDBCollection.()');
	}

	public async readAll(): Promise<unknown[]> {
		// return this.read({});

		return (await this.httpJsonClient.get(this.collectionUrl).toPromise()) as unknown[];
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public updateOneById(id: string, replacementData: unknown): Promise<unknown> {
		// options: { safe?: any; remove?: boolean; upsert?: boolean; new?: boolean },

		// findOneAndReplace: Analogous to HTTP PUT?
		// findOneAndUpdate: Analogous to HTTP PATCH?

		// return this.collection.findOneAndReplace(
		// 	critter(id), // query
		// 	replacementData, // doc
		// 	// { remove: false, upsert: false } // options
		// 	{ upsert: false } // options
		// );
		// /* .then((result: any) => {
		// 		return Promise.resolve(result); // Returns the old version of the record
		// 	})
		// 	.catch((error: Error) => {
		// 		console.error(
		// 			'updateOneById() : error is',
		// 			typeof error,
		// 			error
		// 		);
		//
		// 		return Promise.reject(error);
		// 	}); */
		throw new Error('MongoDBCollection.updateOneById()');
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public deleteOneById(id: string): Promise<boolean> {
		// findOneAndDelete(filter: Filter<TSchema>): Promise<ModifyResult<TSchema>>;

		// return this.collection
		// 	.findOneAndDelete(critter(id))
		// 	.then((result: ModifyResult<Document>) => {
		// 		console.log('deleteOneById() : result is', typeof result, result);
		//
		// 		if (result !== null) {
		// 			console.log('Record was found and removed.');
		// 		} else {
		// 			console.log('Record was not found.');
		// 		}
		//
		// 		return Promise.resolve(result !== null);
		// 	})
		// 	.catch((error: Error) => {
		// 		console.error('deleteOneById() : error is', typeof error, error);
		//
		// 		return Promise.reject(error);
		// 	});
		throw new Error('MongoDBCollection.deleteOneById()');
	}

	public deleteAll(): Promise<boolean> {
		// return (
		// 	this.collection
		// 		.drop()
		// 		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		// 		.then((result: boolean) => Promise.resolve(true))
		// 		.catch((error: unknown) => {
		// 			const errorCast = error as IDropCollectionError;
		//
		// 			if (typeof errorCast === 'undefined' || errorCast.errmsg !== 'ns not found') {
		// 				return Promise.reject(error);
		// 			} else {
		// 				return Promise.resolve(false);
		// 			}
		// 		})
		// );
		throw new Error('MongoDBCollection.deleteAll()');
	}
}

export function createCollection(
	httpJsonClient: IHttpJsonClient,
	collectionUrl: string
): IMongoDBCollection {
	return new MongoDBCollection(httpJsonClient, collectionUrl);
}
