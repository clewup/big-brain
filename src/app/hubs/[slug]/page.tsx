import FourOhFour from '@/components/Errors/FourOhFour/FourOhFour'
import Hub from '@/components/Hub/Hub'
import HubCard from '@/components/HubCard/HubCard'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { hubService } from '@/db/handler'
import { PageContext } from '@/lib/common/types/nextTypes'
import React from 'react'

export default async function Page({ params }: PageContext) {
    const hub = await hubService.getHubByTitle(params.slug)
    const hubs = await hubService.getHubs()

    if (!hub) {
        return <FourOhFour />
    }

    const otherHubs = hubs.filter((_hub) => _hub.title !== hub.title)

    return (
        <PageWrapper>
            <Hub hub={hub} />

            {otherHubs.length > 0 && (
                <div>
                    <div className="flex justify-between items-end">
                        <h1 className="py-5 text-4xl font-semibold">You may also be interested in</h1>
                    </div>
                    <div className="grid grid-cols-3 gap-5">
                        {otherHubs.map((hub, index) => (
                            <HubCard key={index} hub={hub} index={index} />
                        ))}
                    </div>
                </div>
            )}
        </PageWrapper>
    )
}
