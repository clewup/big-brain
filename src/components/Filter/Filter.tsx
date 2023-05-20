'use client'

import AutoSubmit from '@/components/AutoSubmit/AutoSubmit'
import useApi from '@/hooks/useApi/useApi'
import useQueryParams from '@/hooks/useQueryParams/useQueryParams'
import { SearchResponseType } from '@/types/searchTypes'
import { Field, Form, Formik, FormikValues } from 'formik'
import { useSearchParams } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'

interface FilterProps {
    searchResults: SearchResponseType
}

type FilterFormValues = {
    category: string
}

const Filter: FC<FilterProps> = ({ searchResults }) => {
    const searchParams = useSearchParams()
    const { queryParams, setQueryParams } = useQueryParams()
    const { get } = useApi()

    const [categories, setCategories] = useState<string[]>([])

    async function getCategories() {
        const categoriesResponse = await get('/api/category')
        const categoriesData: string[] = await categoriesResponse.json()
        setCategories(categoriesData)
    }

    useEffect(() => {
        getCategories()
    }, [])

    const initialValues: FilterFormValues = {
        category: searchParams.get('category') || 'default',
    }

    function onSubmit(formValues: FormikValues) {
        const reservedValues = ['default']

        Object.entries(formValues).forEach(([key, value]) => {
            const isNotFiltered = reservedValues.includes(value)

            const updatedQuery = {
                ...queryParams,
                page: null,
                [key]: isNotFiltered ? null : value,
            }
            setQueryParams(updatedQuery)
        })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ values, handleChange }) => {
                return (
                    <Form className="flex items-center justify-between gap-20 py-1">
                        <span className="form-control flex-row gap-2">
                            <label className="label">Category</label>
                            <Field name="category">
                                {() => (
                                    <select
                                        name="category"
                                        className="select select-bordered w-60"
                                        disabled={!categories.length}
                                        value={values.category}
                                        onChange={handleChange}>
                                        <option value={'default'}>Select...</option>
                                        {categories.map((category, index) => (
                                            <option key={index} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </Field>
                        </span>
                        <p className="text-lg">
                            {searchResults.pagination.pageResults +
                                searchResults.pagination.resultsPerPage * (searchResults.pagination.page - 1)}
                            /{searchResults.pagination.totalResults} results
                        </p>
                        <AutoSubmit />
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Filter