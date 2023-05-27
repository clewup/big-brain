import Author from '@/components/Author/Author'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import constants from '@/constants/constants'
import { AuthorType } from '@/types/authorTypes'
import React from 'react'

async function getAuthors(): Promise<AuthorType[]> {
    const authorsResponse = await fetch(`${constants.APP_URL}/api/author`, {
        method: 'GET',
        cache: 'no-store',
    })

    const authorsData = await authorsResponse.json()
    if (!authorsResponse.ok) throw new Error(authorsData.error)

    return authorsData
}

export default async function Authors() {
    const authors = await getAuthors()

    return (
        <PageWrapper>
            <h1 className="text-6xl font-satisfice">TOP CONTRIBUTORS</h1>
            <span className="divider" />
            <div className="grid grid-cols-2 md:grid-cols-5">
                {authors.map((author, index) => (
                    <Author author={author} index={index} key={index} />
                ))}
            </div>
        </PageWrapper>
    )
}
