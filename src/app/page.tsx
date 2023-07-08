import GuideCard from '@/components/GuideCard/GuideCard'
import Hero from '@/components/Hero/Hero'
import HubCard from '@/components/HubCard/HubCard'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { guideService, hubService } from '@/db/handler'
import Link from 'next/link'
import React from 'react'

export const metadata = {
    title: 'Big Brain',
}

export default async function Home() {
    const guides = await guideService.getGuides()
    const hubs = await hubService.getHubs()
    const upcomingHubs = await hubService.getUpcomingHubs()

    return (
        <PageWrapper className="flex">
            <div className="w-full flex flex-col gap-10">
                <Hero />

                {hubs.length > 0 && (
                    <div>
                        <div className="flex justify-between items-end">
                            <h1 className="py-5 text-4xl font-semibold">Knowledge Hubs</h1>
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            {hubs.map((hub, index) => (
                                <HubCard key={index} hub={hub} index={index} />
                            ))}
                        </div>
                    </div>
                )}

                {guides.length > 0 && (
                    <div>
                        <div className="flex justify-between items-end">
                            <h1 className="py-5 text-4xl font-semibold">Guides</h1>

                            <Link className="flex gap-2 py-5" href="/search">
                                <p className="text-neutral">See all</p>
                            </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            {guides.slice(0, 6).map((guide, index) => (
                                <GuideCard key={index} guide={guide} index={index} />
                            ))}
                        </div>
                    </div>
                )}

                {upcomingHubs.length > 0 && (
                    <div>
                        <div className="flex justify-between items-end">
                            <h1 className="py-5 text-4xl font-semibold">Coming Soon</h1>
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            {upcomingHubs.map((hub, index) => (
                                <HubCard key={index} hub={hub} index={index} isDisabled={true} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    )
}
