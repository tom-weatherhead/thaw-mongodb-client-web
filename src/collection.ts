// thaw-mongodb-client-web/src/collection.ts

import { IHttpJsonClient, IMongoDBCollection } from 'thaw-types';

class MongoDBCollection implements IMongoDBCollection {
	constructor(
		private readonly httpJsonClient: IHttpJsonClient,
		private readonly collectionUrl: string
	) {}

	public async createOne(dataToInsert: unknown): Promise<unknown> {
		return await this.httpJsonClient.post(this.collectionUrl, dataToInsert).toPromise();
	}

	public async read(criteria = {}): Promise<unknown[]> {
		return (await this.httpJsonClient
			.post(`${this.collectionUrl}/find`, criteria)
			.toPromise()) as unknown[];
	}

	public async readOneById(id: string): Promise<unknown> {
		return await this.httpJsonClient.get(`${this.collectionUrl}/${id}`).toPromise();
	}

	public async readAll(): Promise<unknown[]> {
		return (await this.httpJsonClient.get(this.collectionUrl).toPromise()) as unknown[];
	}

	// public async headOneById(id: string): Promise<unknown> {
	// 	return await this.httpJsonClient.head(`${this.collectionUrl}/${id}`).toPromise();
	// }

	public async replaceOneById(id: string, replacementData: unknown): Promise<unknown> {
		return await this.httpJsonClient
			.put(`${this.collectionUrl}/${id}`, replacementData)
			.toPromise();
	}

	public async updateOneById(id: string, update: unknown): Promise<unknown> {
		return await this.httpJsonClient.patch(`${this.collectionUrl}/${id}`, update).toPromise();
	}

	public async deleteOneById(id: string): Promise<boolean> {
		return await this.httpJsonClient
			.delete(`${this.collectionUrl}/${id}`)
			.toPromise()
			.then((result: unknown) => Promise.resolve(typeof result !== 'undefined'));
		// .catch((error: unknown) => Promise.resolve(false))
	}

	public async deleteAll(): Promise<boolean> {
		return await this.httpJsonClient
			.delete(this.collectionUrl)
			.toPromise()
			.then((result: unknown) => Promise.resolve(typeof result !== 'undefined'));
		// .catch((error: unknown) => Promise.resolve(false))
	}
}

export function createCollection(
	httpJsonClient: IHttpJsonClient,
	collectionUrl: string
): IMongoDBCollection {
	return new MongoDBCollection(httpJsonClient, collectionUrl);
}
