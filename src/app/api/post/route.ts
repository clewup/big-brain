import { UserType } from '@/lib/lockr-auth/types/userTypes'
import prisma from '@/lib/prisma'
import { Comment, Post } from '@prisma/client'
import { NextRequest, NextResponse as response } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
        const post = await prisma.post.findUnique({ include: { comments: true }, where: { id: Number(id) } })

        if (!post) return response.json({ error: `Post ${id} not found` }, { status: 404 })

        // map the user information to the comments
        const commentsWithUsers: (Comment & { user: UserType })[] = []
        for (const comment of post.comments) {
            const userResponse = await fetch(`${process.env.LOCKR_URL}/api/user?id=${comment.createdBy}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${process.env.LOCKR_APPLICATION_SECRET}`,
                },
            })
            const userData = await userResponse.json()
            commentsWithUsers.push({
                ...comment,
                user: userData,
            })
        }
        post.comments = commentsWithUsers

        return response.json(post)
    }

    const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })
    return response.json(posts)
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    const user = request.headers.get('x-user')
    if (!user) return response.json({ error: 'Missing user' }, { status: 400 })

    const { isValid, errors } = validate(body)
    if (!isValid) return response.json({ error: `Invalid ${errors.join(', ')}` }, { status: 400 })

    if (!body.id) {
        const createdPost = await prisma.post.create({
            data: {
                createdBy: user,
                updatedBy: user,
                title: body.title,
                content: body.content,
                image: body.image,
                categories: body.categories,
            },
        })

        return response.json(createdPost)
    }

    const updatedPost = await prisma.post.update({
        where: { id: body.id },
        data: {
            updatedBy: user,
            title: body.title,
            content: body.content,
            image: body.image,
            categories: body.categories,
        },
    })

    return response.json(updatedPost)
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return response.json({ error: `Missing id` }, { status: 404 })

    const deletedPost = await prisma.post.delete({ where: { id: Number(id) } })
    if (!deletedPost) return response.json({ error: `There was a problem deleting post ${id}` }, { status: 400 })

    return response.json({ message: `Post ${id} successfully deleted` })
}

function validate(body: Partial<Post>) {
    const errors: string[] = []

    if (!body.title) errors.push('title')
    if (!body.content) errors.push('content')
    if (!body.image) errors.push('image')
    if (!body.categories) errors.push('categories')

    return {
        isValid: errors.length === 0,
        errors: errors,
    }
}
