import Comment from '@/components/Comment/Comment'
import CommentForm from '@/components/CommentForm/CommentForm'
import Guide from '@/components/Guide/Guide'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import constants from '@/constants/constants'
import { PageContext } from '@/lib/common/types/nextTypes'
import { UserType } from '@/lib/common/types/userTypes'
import { AuthorType } from '@/types/authorTypes'
import { Comment as PrismaComment, Guide as GuideType } from '@prisma/client'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

async function getGuideById(id: number): Promise<GuideType & { comments: (PrismaComment & { user: UserType })[] }> {
    const guideResponse = await fetch(`${constants.APP_URL}/api/guide?id=${id}`, {
        method: 'GET',
        cache: 'no-store',
    })
    const guideData = await guideResponse.json()
    if (!guideResponse.ok) throw new Error(guideData.error)

    return guideData
}

async function getGuideAuthor(id: number): Promise<AuthorType> {
    const authorResponse = await fetch(`${constants.APP_URL}/api/author?id=${id}`, {
        method: 'GET',
    })
    const authorData = await authorResponse.json()
    if (!authorResponse.ok) throw new Error(authorData.error)

    return authorData
}

export async function generateMetadata({ params }: PageContext, parent: ResolvingMetadata): Promise<Metadata> {
    const guide = await getGuideById(Number(params.slug))
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: `Big Brain - ${guide.title}`,
        openGraph: {
            images: [guide.image, ...previousImages],
        },
    }
}

export default async function Page({ params }: PageContext) {
    const guide = await getGuideById(Number(params.slug))
    const author = await getGuideAuthor(Number(params.slug))

    if (!guide) {
        return <p>Not found.</p>
    }

    return (
        <PageWrapper>
            <Guide guide={guide} author={author} />

            <div className="py-5 flex flex-col gap-10">
                <h1 className="font-semibold text-neutral text-center">COMMENTS</h1>

                <div className="flex flex-col gap-5">
                    {guide.comments.map((comment, index) => (
                        <Comment key={index} comment={comment} user={comment.user} />
                    ))}

                    {guide.comments.length === 0 && <p className="text-center">Be the first to leave a comment.</p>}
                </div>
                <div className="w-full">
                    <CommentForm guideId={guide.id} />
                </div>
            </div>
        </PageWrapper>
    )
}
