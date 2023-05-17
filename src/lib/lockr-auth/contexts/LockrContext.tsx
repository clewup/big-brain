'use client'

import { UserType } from '@/lib/lockr-auth/types/userTypes'
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react'

interface LockrContextValues {
    user: UserType | null
    setUser: Dispatch<SetStateAction<UserType | null>>
}

const LockrContext = createContext<LockrContextValues>({} as LockrContextValues)

interface LockrProviderProps {
    children: ReactNode
}

const LockrProvider: FC<LockrProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null)

    return <LockrContext.Provider value={{ user, setUser }}>{children}</LockrContext.Provider>
}

export { LockrContext, LockrProvider }
