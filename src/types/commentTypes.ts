import { UserType } from '@/lib/common/types/userTypes'

export interface CommentType {
    user: UserType
    content: string
    createdAt: Date
}
