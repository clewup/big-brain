import { UserType } from '@/types/userTypes'

export type TokenType = Omit<UserType, 'id'> & { sub: string }
