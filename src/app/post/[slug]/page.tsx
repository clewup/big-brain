import Comment from '@/components/Comment/Comment'
import CommentForm from '@/components/CommentForm/CommentForm'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import constants from '@/constants/constants'
import { UserType } from '@/lib/lockr-auth/types/userTypes'
import { AuthorType } from '@/types/authorTypes'
import { PageContext } from '@/types/nextTypes'
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

            <h1 className="text-6xl font-satisfice mt-10">COMMENTS</h1>
            <span className="divider" />

            <div className="flex flex-col gap-5">
                {post.comments.map((comment, index) => (
                    <Comment key={index} comment={comment} user={comment.user} />
                ))}
            </div>
            <div className="mt-10 w-full">
                <CommentForm post={post.id} />
            </div>
        </PageWrapper>
    )
}
