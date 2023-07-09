'use client'

import Guide from '@/components/Hub/components/Guide/Guide'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useQueryParams from '@/lib/common/hooks/useQueryParams/useQueryParams'
import { GuideType } from '@/types/guideTypes'
import { HubType } from '@/types/hubTypes'
import React, { FC, useEffect, useState } from 'react'
import { Edit } from 'react-feather'

interface HubProps {
    hub: HubType
}

const Hub: FC<HubProps> = ({ hub }) => {
    const { queryParams, setQueryParams } = useQueryParams<{ guide: string; id?: number }>()
    const { isAdmin } = useLockr()

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
        <div className="flex w-full gap-5">
            <div className="w-1/4 relative">
                <div className="sticky top-10 pb-10 flex flex-col gap-5">
                    <div className="flex justify-between items-end">
                        <h1 className="text-4xl font-semibold">{hub.title}</h1>
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

                    <div className="pt-10">
                        {isAdmin && (
                            <button
                                className="text-primary flex gap-2 items-center"
                                onClick={() => setQueryParams({ guide: '', id: hub.id }, 'editor')}>
                                <p className="text-lg">EDIT</p>
                                <Edit size={20} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-4/5">
                <Guide guide={activeGuide} />
            </div>
        </div>
    )
}

export default Hub
