import prisma from '@/lib/prisma'
import { Comment } from '@prisma/client'
import { NextResponse as response } from 'next/dist/server/web/spec-extension/response'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()

    const user = request.headers.get('x-user')
    if (!user) return response.json({ error: 'Missing user' }, { status: 400 })

    const { errors, isValid } = validate(body)
    if (!isValid) return response.json({ error: `Invalid ${errors.join(', ')}` }, { status: 400 })

    const createdComment = await prisma.comment.create({
        data: {
            content: body.content,
            createdBy: user,
            guide: {
                connect: {
                    id: body.guide,
                },
            },
            updatedBy: user,
        },
    })

    return response.json(createdComment)
}

export async function PATCH(request: NextRequest) {
    const body = await request.json()

    if (!body.id) return response.json({ error: `Missing id` }, { status: 404 })

    const user = request.headers.get('x-user')
    if (!user) return response.json({ error: 'Missing user' }, { status: 400 })

    const { errors, isValid } = validate(body)
    if (!isValid) return response.json({ error: `Invalid ${errors.join(', ')}` }, { status: 400 })

    const comment = await prisma.comment.findUnique({ where: { id: Number(body.id) } })
    if (!comment) return response.json({ error: `There was a problem finding comment ${body.id}` }, { status: 400 })
    if (comment.createdBy !== user)
        return response.json({ error: `Comment ${body.id} was not created by user ${user}` }, { status: 400 })

    const updatedComment = await prisma.comment.update({
        data: {
            content: body.content,
            updatedBy: user,
        },
        where: { id: body.id },
    })

    return response.json(updatedComment)
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return response.json({ error: `Missing id` }, { status: 404 })

    const user = request.headers.get('x-user')
    if (!user) return response.json({ error: 'Missing user' }, { status: 400 })

    const comment = await prisma.comment.findUnique({ where: { id: Number(id) } })
    if (!comment) return response.json({ error: `There was a problem finding comment ${id}` }, { status: 400 })
    if (comment.createdBy !== user)
        return response.json({ error: `Comment ${id} was not created by user ${user}` }, { status: 400 })

    const deletedComment = await prisma.comment.delete({ where: { id: Number(id) } })
    if (!deletedComment) return response.json({ error: `There was a problem deleting comment ${id}` }, { status: 400 })

    return response.json({ message: `Comment ${id} successfully deleted` })
}

function validate(body: Partial<Comment & { guide: string }>) {
    const errors: string[] = []

    if (!body.guide) errors.push('guide')
    if (!body.content) errors.push('content')

    return {
        errors: errors,
        isValid: errors.length === 0,
    }
}
