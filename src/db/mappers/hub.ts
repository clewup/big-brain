import { mapGuides } from '@/db/mappers/guide'
import { HubType } from '@/types/hubTypes'
import { Comment, Guide, GuideSection, Hub, HubSection } from '@prisma/client'

export type HubEntity = Hub & {
    sections: (HubSection & { guides: (Guide & { sections: GuideSection[]; comments: Comment[] })[] })[]
}

export function mapHub(hub: HubEntity): HubType {
    return {
        title: hub.title,
        image: hub.image,
        createdAt: hub.createdAt,
        sections: hub.sections.map((section) => ({
            title: section.title,
            guides: mapGuides(section.guides),
        })),
    }
}

export function mapHubs(hubs: HubEntity[]): HubType[] {
    return hubs.map((hub) => mapHub(hub))
}
