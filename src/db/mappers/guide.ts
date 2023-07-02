import { UserType } from '@/lib/common/types/userTypes'
import { AuthorType } from '@/types/authorTypes'
import { GuideType } from '@/types/guideTypes'
import { Comment, Guide, GuideSection } from '@prisma/client'

export type GuideEntity = Guide & { sections: GuideSection[]; comments: Comment[] }

export function mapGuide(guide: GuideEntity): GuideType {
    return {
        id: guide.id,
        title: guide.title,
        image: guide.image,
        createdAt: guide.createdAt,
        //todo: map author
        author: {} as AuthorType,
        categories: guide.categories,
        comments: guide.comments.map((comment) => ({
            //todo: map user
            user: {} as UserType,
            content: comment.content,
            createdAt: comment.updatedAt,
        })),
        sections: guide.sections.map((section) => ({
            title: section.title,
            content: section.content,
        })),
    }
}

export function mapGuides(guides: GuideEntity[]): GuideType[] {
    return guides.map((guide) => mapGuide(guide))
}
