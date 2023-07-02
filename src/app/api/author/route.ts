import prisma from '@/lib/prisma'
import { AuthorType } from '@/types/authorTypes'
import { NextRequest, NextResponse as response } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
        const guide = await prisma.guide.findUnique({ where: { id: Number(id) } })

        if (!guide) return response.json({ error: 'Invalid guide' }, { status: 400 })

        const userResponse = await fetch(`${process.env.LOCKR_URL}/api/user?id=${guide.createdBy}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.LOCKR_APPLICATION_SECRET}`,
            },
        })
        const userData = await userResponse.json()

        const guides = await prisma.guide.findMany({ where: { createdBy: userData.email } })

        const author: AuthorType = {
            id: userData.id,
            name: userData.name,
            image: userData.image,
            guides: guides.length,
        }

        return response.json(author)
    }

    const authors: AuthorType[] = []

    const guides = await prisma.guide.findMany({ select: { createdBy: true } })

    for (const guide of guides) {
        const userResponse = await fetch(`${process.env.LOCKR_URL}/api/user?id=${guide.createdBy}`, {
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
            guides: guides.filter((guide) => guide.createdBy === userData.email).length,
        }

        if (authors.filter((auth) => auth.id === author.id).length === 0) {
            authors.push(author)
        }
    }

    const sortedAuthors = authors.sort((a, b) => b.guides - a.guides)

    return response.json(sortedAuthors)
}
