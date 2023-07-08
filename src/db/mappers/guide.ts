import { GuideType } from '@/types/guideTypes'
import { Guide, GuideSection, Hub, HubSection } from '@prisma/client'

export type GuideEntity = Guide & {
    hubSection: HubSection & { hub: Hub }
    sections: GuideSection[]
}

export function mapGuide(guide: GuideEntity): GuideType {
    return {
        categories: guide.categories,
        createdAt: guide.createdAt,
        hub: guide.hubSection.hub.title,
        id: guide.id,
        image: guide.image,
        sections: guide.sections.map((section) => ({
            content: section.content,
            id: section.id,
            title: section.title,
        })),
        title: guide.title,
    }
}

export function mapGuides(guides: GuideEntity[]): GuideType[] {
    return guides.map((guide) => mapGuide(guide))
}
