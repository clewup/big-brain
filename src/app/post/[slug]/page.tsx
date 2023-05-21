import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import prisma from '@/lib/prisma'
import { PageContext } from '@/types/nextTypes'

async function getPostById(id: number) {
    return await prisma.post.findUnique({ where: { id: id } })
}

export default async function PostSlug({ params }: PageContext) {
    const post = await getPostById(Number(params.slug))

    if (!post) {
        return <p>Not found.</p>
    }

    return (
        <PageWrapper>
            <Post post={post} isFullPost={true} />
        </PageWrapper>
    )
}
