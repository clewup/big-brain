import prisma from '@/lib/prisma'
import { NextRequest, NextResponse as response } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()

    const user = request.headers.get('x-user')
    if (!user) return response.json({ error: 'Missing user' }, { status: 400 })

    const { isValid, errors } = validate(body)
    if (!isValid) return response.json({ error: `Invalid ${errors.join(', ')}` }, { status: 400 })

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

function validate(body: any) {
    const errors: string[] = []

    if (!body.title) errors.push('title')
    if (!body.content) errors.push('content')
    if (!body.image) errors.push('image')
    if (!body.categories) errors.push('categories')
    if (!body.comments) errors.push('comments')

    return {
        isValid: errors.length === 0,
        errors: errors,
    }
}
