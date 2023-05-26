import DexieServices from '@/lib/dexie/services'
import DexieBase, { Table } from 'dexie'

export type CookieConsent = {
    id?: number
    isConsenting: boolean
}

export enum DexieTables {
    COOKIE_CONSENT = 'cookieConsent',
}

export class Dexie extends DexieBase {
    services: DexieServices

    cookieConsent!: Table<CookieConsent>

    constructor() {
        super('blog')

        this.version(1).stores({
            cookieConsent: '++id, isConsenting',
        })

        this.services = new DexieServices(this)
    }
}

export const db = new Dexie()
