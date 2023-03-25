import { Db, MongoClient, MongoClientOptions } from 'mongodb';

const DB_CONNECTION_STRING = process.env.DB_CONN_STRING;
const DB_NAME = process.env.DB_NAME;

if (!DB_CONNECTION_STRING) throw new Error('The database connection string has not been defined.');

if (!DB_NAME) throw new Error('The database has not been defined.');

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectDb() {
    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    const opts: MongoClientOptions = {};

    if (!DB_CONNECTION_STRING)
        throw new Error("The database connection string has not been defined.");

    const client = new MongoClient(DB_CONNECTION_STRING, opts);
    await client.connect();
    const db = client.db(DB_NAME);

    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}
