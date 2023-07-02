import { GuideType } from '@/types/guideTypes'

export type SearchRequestType = {
    search?: string
    category?: string
    page?: string
}

export type SearchResponseType = {
    results: GuideType[]
    pagination: Pagination
}

export type Pagination = {
    totalResults: number
    pageResults: number
    page: number
    totalPages: number
    resultsPerPage: number
}
