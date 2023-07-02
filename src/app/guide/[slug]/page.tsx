import Comment from '@/components/Comment/Comment'
import CommentForm from '@/components/CommentForm/CommentForm'
import Guide from '@/components/Guide/Guide'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import { guideService } from '@/db/handler'
import { PageContext } from '@/lib/common/types/nextTypes'
import { Metadata } from 'next'
import React from 'react'

export async function generateMetadata({ params }: PageContext): Promise<Metadata> {
    const guide = await guideService.getGuideById(Number(params.slug))

    if (!guide) {
        return {
            title: `Big Brain`,
        }
    }

    return {
        title: `Big Brain - ${guide.title}`,
    }
}

export default async function Page({ params }: PageContext) {
    const guide = await guideService.getGuideById(Number(params.slug))

    if (!guide) {
        return <p>Not found.</p>
    }

    return (
        <PageWrapper>
            <Guide guide={guide} />

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
