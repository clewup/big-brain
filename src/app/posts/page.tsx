'use client'

import Filter from '@/components/Filter/Filter'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import useApi from '@/lib/common/hooks/useApi/useApi'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { SearchRequestType, SearchResponseType } from '@/types/searchTypes'
import cx from 'classnames'
import { useSearchParams } from 'next/navigation'
import { stringify } from 'querystring'
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function Posts() {
    const { queryParams, setQueryParams } = useQueryParams()
    const searchParams = useSearchParams()
    const { get } = useApi()

    const [searchResults, setSearchResults] = useState<SearchResponseType>({
        results: [],
        pagination: {
            totalResults: 0,
            pageResults: 0,
            page: 1,
            totalPages: 1,
            resultsPerPage: 0,
        },
    })
    const [isLoading, setLoading] = useState(true)

    async function getFilteredPosts(query: string) {
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
        getFilteredPosts(formattedQuery)
    }, [searchParams])

    return (
        <PageWrapper className="relative w-full">
            <div className="flex flex-col gap-5 pb-20">
                <Filter searchResults={searchResults} />

                {isLoading ? (
                    <div className="w-full h-60 flex justify-center items-center">
                        <TailSpin color="#111111" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {searchResults.results.map((post, index) => (
                            <Post key={index} post={post} isLatest={index === 0} />
                        ))}
                    </div>
                )}

                <div className="btn-group absolute bottom-0 mb-5">
                    {Array.from({ length: searchResults.pagination.totalPages }, (_, index) => index + 1).map(
                        (pageNumber, index) => {
                            return (
                                <button
                                    key={index}
                                    className={cx('btn', {
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
