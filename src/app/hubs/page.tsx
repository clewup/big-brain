import HubCard from '@/components/HubCard/HubCard'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { hubService } from '@/db/handler'
import React from 'react'

export default async function Page() {
    const hubs = await hubService.getHubs()

    return (
        <PageWrapper>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20">
                {hubs.map((hub, index) => (
                    <HubCard key={index} hub={hub} index={index} />
                ))}
            </div>
        </PageWrapper>
    )
}
