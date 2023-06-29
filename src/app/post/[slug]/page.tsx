import Comment from '@/components/Comment/Comment'
import CommentForm from '@/components/CommentForm/CommentForm'
import Heading from '@/components/Heading/Heading'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import constants from '@/constants/constants'
import { PageContext } from '@/lib/common/types/nextTypes'
import { UserType } from '@/lib/common/types/userTypes'
import { AuthorType } from '@/types/authorTypes'
import { Comment as PrismaComment, Post as PrismaPost } from '@prisma/client'
import { Metadata, ResolvingMetadata } from 'next'
import React from 'react'

async function getPostById(id: number): Promise<PrismaPost & { comments: (PrismaComment & { user: UserType })[] }> {
    const postResponse = await fetch(`${constants.APP_URL}/api/post?id=${id}`, {
        method: 'GET',
        cache: 'no-store',
    })
    const postData = await postResponse.json()
    if (!postResponse.ok) throw new Error(postData.error)

    return postData
}

async function getPostAuthor(id: number): Promise<AuthorType> {
    const authorResponse = await fetch(`${constants.APP_URL}/api/author?id=${id}`, {
        method: 'GET',
    })
    const authorData = await authorResponse.json()
    if (!authorResponse.ok) throw new Error(authorData.error)

    return authorData
}

export async function generateMetadata({ params }: PageContext, parent: ResolvingMetadata): Promise<Metadata> {
    const post = await getPostById(Number(params.slug))
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: `Blog - ${post.title}`,
        openGraph: {
            images: [post.image, ...previousImages],
        },
    }
}

export default async function PostSlug({ params }: PageContext) {
    const post = await getPostById(Number(params.slug))
    const author = await getPostAuthor(Number(params.slug))

    if (!post) {
        return <p>Not found.</p>
    }

    return (
        <PageWrapper>
            <Post post={post} isFullPost={true} author={author} />

            <div className="py-5 flex flex-col gap-10">
                <Heading>COMMENTS</Heading>

                <div className="flex flex-col gap-5">
                    {post.comments.map((comment, index) => (
                        <Comment key={index} comment={comment} user={comment.user} />
                    ))}
                </div>
                <div className="w-full">
                    <CommentForm post={post.id} />
                </div>
            </div>
        </PageWrapper>
    )
}
