import { UserType } from '@/lib/common/types/userTypes'
import prisma from '@/lib/prisma'
import { Comment, Guide } from '@prisma/client'
import { NextRequest, NextResponse as response } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
        const guide = await prisma.guide.findUnique({ include: { comments: true }, where: { id: Number(id) } })

        if (!guide) return response.json({ error: `Guide ${id} not found` }, { status: 404 })

        // map the user information to the comments
        const commentsWithUsers: (Comment & { user: UserType })[] = []
        for (const comment of guide.comments) {
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
        guide.comments = commentsWithUsers

        return response.json(guide)
    }

    const guides = await prisma.guide.findMany({ orderBy: { createdAt: 'desc' } })
    return response.json(guides)
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    const user = request.headers.get('x-user')
    if (!user) return response.json({ error: 'Missing user' }, { status: 400 })

    const { isValid, errors } = validate(body)
    if (!isValid) return response.json({ error: `Invalid ${errors.join(', ')}` }, { status: 400 })

    if (!body.id) {
        const createdGuide = await prisma.guide.create({
            data: {
                createdBy: user,
                updatedBy: user,
                title: body.title,
                image: body.image,
                categories: body.categories,
                hubSection: body.hubSection,
            },
        })

        return response.json(createdGuide)
    }

    const updatedGuide = await prisma.guide.update({
        where: { id: body.id },
        data: {
            updatedBy: user,
            title: body.title,
            image: body.image,
            categories: body.categories,
        },
    })

    return response.json(updatedGuide)
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return response.json({ error: `Missing id` }, { status: 404 })

    const deletedGuide = await prisma.guide.delete({ where: { id: Number(id) } })
    if (!deletedGuide) return response.json({ error: `There was a problem deleting guide ${id}` }, { status: 400 })

    return response.json({ message: `Guide ${id} successfully deleted` })
}

function validate(body: Partial<Guide & { hubSection: string }>) {
    const errors: string[] = []

    if (!body.title) errors.push('title')
    if (!body.image) errors.push('image')
    if (!body.categories) errors.push('categories')
    if (!body.hubSection) errors.push('hubSection')

    return {
        isValid: errors.length === 0,
        errors: errors,
    }
}
