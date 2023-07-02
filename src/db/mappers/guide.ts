import { UserType } from '@/lib/common/types/userTypes'
import { AuthorType } from '@/types/authorTypes'
import { GuideType } from '@/types/guideTypes'
import { Comment, Guide, GuideSection, Hub, HubSection } from '@prisma/client'

export type GuideEntity = Guide & {
    hubSection: HubSection & { hub: Hub }
    sections: GuideSection[]
    comments: Comment[]
}

export function mapGuide(guide: GuideEntity): GuideType {
    return {
        //todo: map author
        author: {} as AuthorType,
        categories: guide.categories,
        comments: guide.comments.map((comment) => ({
            content: comment.content,
            createdAt: comment.updatedAt,
            //todo: map user
            user: {} as UserType,
        })),
        createdAt: guide.createdAt,
        hub: guide.hubSection.hub.title,
        id: guide.id,
        image: guide.image,
        sections: guide.sections.map((section) => ({
            content: section.content,
            title: section.title,
        })),
        title: guide.title,
    }
}

export function mapGuides(guides: GuideEntity[]): GuideType[] {
    return guides.map((guide) => mapGuide(guide))
}
