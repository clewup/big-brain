import prisma from '@/lib/prisma'
import { NextRequest, NextResponse as response } from 'next/server'

export async function GET(request: NextRequest) {
    const PAGE_SIZE = 6

    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const page = searchParams.get('page') || '1'

    const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } })

    let filteredPosts = posts
    if (search) filteredPosts = filteredPosts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
    if (category)
        filteredPosts = filteredPosts.filter((post) =>
            post.categories.some((cat) => cat.toLowerCase() === category.toLowerCase())
        )

    const paginatedPosts = filteredPosts.slice((Number(page) - 1) * PAGE_SIZE, Number(page) * PAGE_SIZE)
    const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE)

    return response.json({
        results: paginatedPosts,
        pagination: {
            totalResults: filteredPosts.length,
            pageResults: paginatedPosts.length,
            page: Number(page),
            totalPages: totalPages,
            resultsPerPage: PAGE_SIZE,
        },
    })
}
