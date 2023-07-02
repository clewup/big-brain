'use client'

import Guide from '@/components/Guide/Guide'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { GuideType } from '@/types/guideTypes'
import { HubType } from '@/types/hubTypes'
import React, { FC, useEffect, useState } from 'react'

interface HubProps {
    hub: HubType
}

const Hub: FC<HubProps> = ({ hub }) => {
    const { queryParams, setQueryParams } = useQueryParams<{ guide: string }>()

    const [activeGuide, setActiveGuide] = useState(hub.sections[0].guides[0])

    function getGuideByTitle(hub: HubType, title: string): GuideType | undefined {
        for (const section of hub.sections) {
            const guide = section.guides.find((g) => g.title === title)
            if (guide) {
                return guide
            }
        }

        return undefined
    }

    useEffect(() => {
        if (queryParams.guide) {
            const guide = getGuideByTitle(hub, queryParams.guide)
            if (guide) {
                setActiveGuide(guide)
            }
        }
    }, [queryParams])

    return (
        <div className="flex w-full">
            <div className="w-1/5 relative">
                <div className="sticky top-10">
                    <div className="flex justify-between items-end">
                        <h1 className="pb-5 text-4xl font-semibold">{hub.title}</h1>
                    </div>

                    {hub.sections.map((section, index) => (
                        <div key={index}>
                            <p className="font-semibold">{section.title}</p>

                            <div className="ml-10">
                                {section.guides.map((guide, index) => (
                                    <p
                                        key={index}
                                        onClick={() => setQueryParams({ ...queryParams, guide: guide.title })}
                                        className="cursor-pointer">
                                        {guide.title}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-4/5">
                <Guide guide={activeGuide} />
            </div>
        </div>
    )
}

export default Hub
