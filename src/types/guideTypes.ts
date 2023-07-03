import { AuthorType } from '@/types/authorTypes'
import { CommentType } from '@/types/commentTypes'

export interface GuideType {
    id?: number
    title: string
    image: string
    createdAt: Date
    author: AuthorType
    hub?: string
    categories: string[]
    comments: CommentType[]
    sections: GuideSectionType[]
}

export interface GuideSectionType {
    title: string
    content: string
}
