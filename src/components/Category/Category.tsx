'use client'

import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import React, { FC } from 'react'

interface CategoryProps {
    category: string
}

const Category: FC<CategoryProps> = ({ category }) => {
    const { queryParams, setQueryParams } = useQueryParams()

    function onClick() {
        const updatedQuery = { ...queryParams, category: category, page: null }
        setQueryParams(updatedQuery, '/search')
    }

    return (
        <div
            onClick={onClick}
            className="cursor-pointer flex flex-col justify-center items-center py-5 border-2 border-neutral rounded-md hover:bg-primary hover:border-0 hover:text-white duration-300">
            <h1 className="text-xl">{category}</h1>
        </div>
    )
}

export default Category
