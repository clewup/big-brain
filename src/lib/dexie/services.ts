import { Dexie } from '@/lib/dexie/db'
import { IndexableType } from 'dexie'

export default class DexieServices {
    private db: Dexie

    constructor(db: Dexie) {
        this.db = db
    }

    async get<T>(table: string, key: number) {
        return this.db.table(table).get(key) as T
    }

    async add<T = IndexableType>(table: string, data: unknown) {
        return this.db.table(table).add(data) as T
    }

    async check(table: string, key?: number) {
        if (key) {
            return !!this.db.table(table).get(key)
        } else {
            return (await this.db.table(table).count()) > 0
        }
    }

    async update<T = IndexableType>(table: string, key: number, data: unknown) {
        return this.db.table(table).put(data, key) as T
    }

    async delete(table: string, key: number) {
        return this.db.table(table).delete(key)
    }
}
