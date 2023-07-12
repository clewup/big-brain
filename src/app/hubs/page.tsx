import HubCard from '@/components/HubCard/HubCard'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { hubService } from '@/db/handler'
import React from 'react'

export default async function Page() {
    const hubs = await hubService.getHubs()

    return (
        <PageWrapper>
            <div className="pt-20 pb-24 flex items-center justify-center">
                <h1 className="text-5xl font-semibold">Knowledge Hubs</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {hubs.map((hub, index) => (
                    <HubCard key={index} hub={hub} index={index} />
                ))}
            </div>
        </PageWrapper>
    )
}
