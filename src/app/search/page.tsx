'use client'

import Filter from '@/components/Filter/Filter'
import GuideCard from '@/components/GuideCard/GuideCard'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { SearchRequestType, SearchResponseType } from '@/types/searchTypes'
import cx from 'classnames'
import { useSearchParams } from 'next/navigation'
import { stringify } from 'querystring'
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function Page() {
    const { queryParams, setQueryParams } = useQueryParams()
    const searchParams = useSearchParams()
    const { get } = useApi()

    const [searchResults, setSearchResults] = useState<SearchResponseType>({
        pagination: {
            page: 1,
            pageResults: 0,
            resultsPerPage: 0,
            totalPages: 1,
            totalResults: 0,
        },
        results: [],
    })
    const [isLoading, setLoading] = useState(true)

    async function getFilteredGuides(query: string) {
        const searchData = await get<SearchResponseType>(`/api/search?${query}`, { cache: 'no-store' })
        setSearchResults(searchData)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        const search = searchParams.get('search')
        const category = searchParams.get('category')
        const page = searchParams.get('page')

        const queryObject: SearchRequestType = {}
        if (search) queryObject.search = search
        if (category) queryObject.category = category
        if (page) queryObject.page = page

        const formattedQuery = stringify(queryObject)
        getFilteredGuides(formattedQuery)
    }, [searchParams])

    return (
        <PageWrapper className="relative w-full">
            <div className="flex flex-col gap-5 pb-32">
                <Filter searchResults={searchResults} />

                {isLoading ? (
                    <div className="w-full h-60 flex justify-center items-center">
                        <TailSpin color="#9ca3af" />
                    </div>
                ) : searchResults.results.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20">
                        {searchResults.results.map((guide, index) => (
                            <GuideCard key={index} guide={guide} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="h-60 flex justify-center items-center">
                        <p>No results found</p>
                    </div>
                )}

                <div className="btn-group absolute bottom-0 mb-5">
                    {Array.from({ length: searchResults.pagination.totalPages }, (_, index) => index + 1).map(
                        (pageNumber, index) => {
                            return (
                                <button
                                    key={index}
                                    className={cx('btn text-white', {
                                        'btn-active': pageNumber === searchResults.pagination.page,
                                    })}
                                    onClick={() => {
                                        const updatedQuery = { ...queryParams, page: pageNumber }
                                        setQueryParams(updatedQuery)
                                    }}
                                    disabled={isLoading}>
                                    {pageNumber}
                                </button>
                            )
                        }
                    )}
                </div>
            </div>
        </PageWrapper>
    )
}
