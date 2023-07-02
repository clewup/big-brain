import { GuideType } from '@/types/guideTypes'

export interface HubType {
    title: string
    image: string
    createdAt: Date
    features: string[]
    sections: HubSectionType[]
}

export interface HubSectionType {
    title: string
    guides: GuideType[]
}
