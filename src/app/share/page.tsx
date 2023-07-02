import GuideForm from '@/components/GuideForm/GuideForm'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import constants from '@/constants/constants'
import { PageContext } from '@/lib/common/types/nextTypes'
import { Guide } from '@prisma/client'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

async function getGuideById(id: string | undefined): Promise<Guide | undefined> {
    if (!id) {
        return undefined
    }

    const guideResponse = await fetch(`${constants.APP_URL}/api/guide?id=${id}`, {
        method: 'GET',
        cache: 'no-store',
    })
    return guideResponse.json()
}

export async function generateMetadata({ searchParams }: PageContext, parent: ResolvingMetadata): Promise<Metadata> {
    const initialGuide = await getGuideById(searchParams.id)
    const previousImages = (await parent)?.openGraph?.images || []

    return {
        title: initialGuide?.title ? `Big Brain - ${initialGuide.title}` : 'Big Brain - Create',
        openGraph: {
            images: [initialGuide?.image || '', ...previousImages],
        },
    }
}

export default async function Page({ searchParams }: PageContext) {
    const initialGuide = await getGuideById(searchParams.id)

    return (
        <PageWrapper requireLoggedIn={true}>
            <GuideForm initialGuide={initialGuide} />
        </PageWrapper>
    )
}
