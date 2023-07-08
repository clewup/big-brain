import { guideService } from '@/db/handler'
import { NextRequest, NextResponse as response } from 'next/server'

export async function GET(request: NextRequest) {
    const PAGE_SIZE = 6

    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search')
    const category = searchParams.get('category')
    const page = searchParams.get('page') || '1'

    let guides = await guideService.getGuides({ orderBy: { createdAt: 'desc' } })

    if (search) guides = guides.filter((guide) => guide.title.toLowerCase().includes(search.toLowerCase()))
    if (category)
        guides = guides.filter((guide) => guide.categories.some((cat) => cat.toLowerCase() === category.toLowerCase()))

    const paginatedGuides = guides.slice((Number(page) - 1) * PAGE_SIZE, Number(page) * PAGE_SIZE)
    const totalPages = Math.ceil(guides.length / PAGE_SIZE)

    return response.json({
        pagination: {
            page: Number(page),
            pageResults: paginatedGuides.length,
            resultsPerPage: PAGE_SIZE,
            totalPages: totalPages,
            totalResults: guides.length,
        },
        results: paginatedGuides,
    })
}
