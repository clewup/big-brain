export interface GuideType {
    id?: number
    title: string
    image: string
    createdAt?: Date
    hub?: string
    categories: string[]
    sections: GuideSectionType[]
}

export interface GuideSectionType {
    title: string
    content: string
}
