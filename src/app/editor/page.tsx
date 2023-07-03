import HubEditor from '@/components/HubEditor/HubEditor'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { hubService } from '@/db/handler'
import { PageContext } from '@/lib/common/types/nextTypes'
import React from 'react'

export default async function Page({ searchParams }: PageContext) {
    const hub = await hubService.getHubById(Number(searchParams.id))

    return (
        <PageWrapper requireAdminRole={true}>
            <HubEditor />
        </PageWrapper>
    )
}
