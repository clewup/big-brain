import prisma from '@/lib/prisma'
import { NextRequest, NextResponse as response } from 'next/server'

export async function GET(request: NextRequest) {
    const posts = await prisma.post.findMany({
        select: { categories: true },
        orderBy: { categories: 'asc' },
        distinct: ['categories'],
    })
    const categories = posts.flatMap((post) => post.categories)

    return response.json(categories)
}
