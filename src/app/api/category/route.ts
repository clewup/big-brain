import prisma from '@/lib/prisma'
import { NextRequest, NextResponse as response } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    const guides = await prisma.guide.findMany({
        select: { categories: true },
        orderBy: { categories: 'asc' },
        distinct: ['categories'],
    })
    const categories = guides.flatMap((guide) => guide.categories)

    return response.json(categories)
}
