import prisma from '@/lib/prisma'
import { AuthorType } from '@/types/authorTypes'
import { NextRequest, NextResponse as response } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
        const post = await prisma.post.findUnique({ where: { id: Number(id) } })

        if (!post) return response.json({ error: 'Invalid post' }, { status: 400 })

        const userResponse = await fetch(`${process.env.LOCKR_URL}/api/user?id=${post.createdBy}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.LOCKR_APPLICATION_SECRET}`,
            },
        })
        const userData = await userResponse.json()

        const posts = await prisma.post.findMany({ where: { createdBy: userData.email } })

        const author: AuthorType = {
            id: userData.id,
            name: userData.name,
            image: userData.image,
            posts: posts.length,
        }

        return response.json(author)
    }

    const authors: AuthorType[] = []

    const posts = await prisma.post.findMany({ select: { createdBy: true } })

    for (const post of posts) {
        const userResponse = await fetch(`${process.env.LOCKR_URL}/api/user?id=${post.createdBy}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.LOCKR_APPLICATION_SECRET}`,
            },
        })
        const userData = await userResponse.json()

        const author: AuthorType = {
            id: userData.id,
            name: userData.name,
            image: userData.image,
            posts: posts.filter((post) => post.createdBy === userData.email).length,
        }

        if (authors.filter((auth) => auth.id === author.id).length === 0) {
            authors.push(author)
        }
    }

    const sortedAuthors = authors.sort((a, b) => b.posts - a.posts)

    return response.json(sortedAuthors)
}
