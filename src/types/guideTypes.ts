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
    id?: number
    title: string
    content: string
}
