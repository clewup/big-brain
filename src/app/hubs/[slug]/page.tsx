import Hub from '@/components/Hub/Hub'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { hubService } from '@/db/handler'
import { PageContext } from '@/lib/common/types/nextTypes'
import React from 'react'

export default async function Page({ params }: PageContext) {
    const hub = await hubService.getHubByTitle(params.slug)

    if (!hub) {
        return (
            //todo: create generic 404
            <p>404</p>
        )
    }

    return (
        <PageWrapper>
            <Hub hub={hub} />
        </PageWrapper>
    )
}
