import Category from '@/components/Category/Category'
import GuideCard from '@/components/GuideCard/GuideCard'
import Hero from '@/components/Hero/Hero'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import constants from '@/constants/constants'
import { PageContext } from '@/lib/common/types/nextTypes'
import { Guide as GuideType } from '@prisma/client'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import React from 'react'

async function getGuides(): Promise<GuideType[]> {
    const guidesReponse = await fetch(`${constants.APP_URL}/api/guide`, {
        method: 'GET',
        cache: 'no-store',
    })
    const guidesData = await guidesReponse.json()

    if (!guidesReponse.ok) throw new Error(guidesData.error)

    return guidesData
}

async function getCategories(): Promise<string[]> {
    const categoriesResponse = await fetch(`${constants.APP_URL}/api/category`, {
        method: 'GET',
        cache: 'reload',
    })
    const categoriesData = await categoriesResponse.json()

    if (!categoriesResponse.ok) throw new Error(categoriesData.error)

    return categoriesData
}

// eslint-disable-next-line no-empty-pattern
export async function generateMetadata({}: PageContext, parent: ResolvingMetadata): Promise<Metadata> {
    const previousImages = (await parent)?.openGraph?.images || []

    return {
        title: 'Big Brain',
        openGraph: {
            images: [...previousImages],
        },
    }
}

export default async function Home() {
    const guides = await getGuides()
    const categories = await getCategories()

    return (
        <PageWrapper className="flex">
            <div className="w-full flex flex-col gap-10">
                <Hero />

                {categories.length > 0 && (
                    <div>
                        <div className="flex justify-between items-end">
                            <h1 className="py-5 text-4xl font-semibold">Knowledge Hubs</h1>
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            {categories.map((category, index) => (
                                <Category key={index} category={category} />
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
            </div>
        </PageWrapper>
    )
}
