import { guideService } from '@/db/handler'
import { NextRequest, NextResponse as response } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    const categories = await guideService.getGuideCategories()
    return response.json(categories)
}
