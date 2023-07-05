import { mapGuides } from '@/db/mappers/guide'
import { HubType } from '@/types/hubTypes'
import { Comment, Guide, GuideSection, Hub, HubSection } from '@prisma/client'

export type HubEntity = Hub & {
    sections: (HubSection & {
        guides: (Guide & { hubSection: HubSection & { hub: Hub }; sections: GuideSection[]; comments: Comment[] })[]
    })[]
}

export function mapHub(hub: HubEntity): HubType {
    return {
        createdAt: hub.createdAt,
        features: hub.features,
        id: hub.id,
        image: hub.image,
        sections: hub.sections.map((section) => ({
            guides: mapGuides(section.guides),
            title: section.title,
        })),
        title: hub.title,
    }
}

export function mapHubs(hubs: HubEntity[]): HubType[] {
    return hubs.map((hub) => mapHub(hub))
}
