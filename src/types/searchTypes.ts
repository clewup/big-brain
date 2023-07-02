import { Guide } from '.prisma/client'

export type SearchRequestType = {
    search?: string
    category?: string
    page?: string
}

export type SearchResponseType = {
    results: Guide[]
    pagination: Pagination
}

export type Pagination = {
    totalResults: number
    pageResults: number
    page: number
    totalPages: number
    resultsPerPage: number
}
