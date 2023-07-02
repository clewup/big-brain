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
            <div className="w-1/5">
                <div className="flex justify-between items-end">
                    <h1 className="pb-5 text-4xl font-semibold">{hub.title}</h1>
                </div>

                {hub.sections.map((section, index) => (
                    <div key={index}>
                        <p className="font-semibold">{section.title}</p>

                        <div className="ml-10">
                            {section.guides.map((guide, index) => (
                                <p key={index}>{guide.title}</p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </PageWrapper>
    )
}
