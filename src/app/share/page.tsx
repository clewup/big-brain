import GuideForm from '@/components/GuideForm/GuideForm'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { guideService } from '@/db/handler'
import { PageContext } from '@/lib/common/types/nextTypes'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata({ searchParams }: PageContext): Promise<Metadata> {
    const initialGuide = await guideService.getGuideById(Number(searchParams.id))

    return {
        title: initialGuide?.title ? `Big Brain - ${initialGuide.title}` : 'Big Brain - Create',
    }
}

export default async function Page({ searchParams }: PageContext) {
    const initialGuide = await guideService.getGuideById(Number(searchParams.id))

    return (
        <PageWrapper requireLoggedIn={true}>
            <GuideForm initialGuide={initialGuide} />
        </PageWrapper>
    )
}
