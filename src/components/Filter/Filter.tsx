'use client'

import useApi from '@/hooks/useApi/useApi'
import useQueryParams from '@/hooks/useQueryParams/useQueryParams'
import { useSearchParams } from 'next/navigation'
import { stringify } from 'querystring'
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Post } from '.prisma/client'

interface FilterProps {
    setPosts: Dispatch<SetStateAction<Post[]>>
    setLoading: Dispatch<SetStateAction<boolean>>
}

type SearchRequestType = {
    search?: string
    category?: string
}

type SearchResponseType = {
    page: number
    results: Post[]
    resultsCount: number
    totalCount: number
}

const Filter: FC<FilterProps> = ({ setPosts, setLoading }) => {
    const searchParams = useSearchParams()
    const { queryParams, setQueryParams } = useQueryParams()
    const { get } = useApi()

    const [categories, setCategories] = useState<string[]>([])
    const [count, setCount] = useState({
        results: 0,
        total: 0,
    })
    const [filterValues, setFilterValues] = useState<SearchRequestType>({
        category: searchParams.get('category') || 'default',
    })
    async function getFilteredPosts(query: string) {
        const searchResponse = await get(`/api/search?${query}`)
        const searchData: SearchResponseType = await searchResponse.json()
        setPosts(searchData.results)
        setCount({
            results: searchData.resultsCount,
            total: searchData.totalCount,
        })
        setLoading(false)
    }

    async function getCategories() {
        const categoriesResponse = await get('/api/category')
        const categoriesData: string[] = await categoriesResponse.json()
        setCategories(categoriesData)
    }

    function updateQueryString(key: string, value: string | null) {
        const updatedQuery = {
            ...queryParams,
            [key]: value,
        }

        setQueryParams(updatedQuery)
    }

    useEffect(() => {
        if (!categories.length) {
            getCategories()
        }

        setLoading(true)
        const search = searchParams.get('search')
        const category = searchParams.get('category')

        const queryObject: SearchRequestType = {}
        if (search) queryObject.search = search
        if (category) queryObject.category = category

        const formattedQuery = stringify(queryObject)
        getFilteredPosts(formattedQuery)
    }, [searchParams])

    return (
        <div className="flex items-center justify-between gap-20 py-1">
            <span className="form-control flex-row gap-2">
                <label className="label">Category</label>
                <select
                    className="select select-bordered w-60"
                    disabled={!categories.length}
                    value={filterValues.category}
                    onChange={({ target: { value } }) => {
                        const isNotQueried = value === 'default'
                        setFilterValues({ ...filterValues, category: value })
                        updateQueryString('category', isNotQueried ? null : value)
                    }}>
                    <option value={'default'}>Select...</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </span>
            <p className="text-lg">
                {count.results}/{count.total} results
            </p>
        </div>
    )
}

export default Filter
