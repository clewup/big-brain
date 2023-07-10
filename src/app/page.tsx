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

    return (
        <PageWrapper className="flex">
            <div className="w-full flex flex-col gap-10">
                <Hero />

                {hubs.length > 0 && (
                    <div>
                        <div className="flex justify-between items-end border-b-2 border-base-200 mb-10">
                            <h1 className="py-5 text-4xl font-semibold">Knowledge Hubs</h1>
                        </div>
                        <div className="grid grid-cols-2 gap-10">
                            {hubs.map((hub, index) => (
                                <HubCard key={index} hub={hub} index={index} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="min-h-[60vh] flex items-center justify-center flex-col text-center ">
                    <div className="flex flex-col gap-10 items-center">
                        <h1 className="font-bold text-4xl">The power of Big Brain</h1>
                        <p className="text-xl w-4/5 text-neutral leading-[2.5rem]">
                            Through comprehensive knowledge, sourced from industry specialists, you can learn lifelong
                            skills at your own pace.
                        </p>
                    </div>
                </div>

                {guides.length > 0 && (
                    <div className="overflow-hidden">
                        <div className="flex justify-between items-end border-b-2 border-base-200 mb-10">
                            <h1 className="pb-5 text-4xl font-semibold">Guides</h1>

                            <Link className="flex gap-2 py-5" href="/search">
                                <p className="text-info">See all</p>
                            </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-10 grid-flow-col">
                            {guides.slice(0, 3).map((guide, index) => {
                                if (index === 0) {
                                    return (
                                        <div key={index} className="row-span-2 col-span-2">
                                            <GuideCard guide={guide} index={index} shouldShowContent={true} />
                                        </div>
                                    )
                                }

                                return <GuideCard key={index} guide={guide} index={index} />
                            })}
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    )
}
