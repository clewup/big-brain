import prisma from '@/lib/prisma'
import { NextRequest, NextResponse as response } from 'next/server'

export async function GET(request: NextRequest) {
    const PAGE_SIZE = 30

    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const page = searchParams.get('page') || '1'

    const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })

    let filteredPosts = posts
    if (search) filteredPosts = filteredPosts.filter((post) => post.title.includes(search))
    if (category) filteredPosts = filteredPosts.filter((post) => post.categories.includes(category))

    const paginatedPosts = filteredPosts.slice((Number(page) - 1) * PAGE_SIZE, Number(page) * PAGE_SIZE)

    return response.json({
        page: page,
        results: paginatedPosts,
        resultsCount: paginatedPosts.length,
        totalCount: posts.length,
    })
}
