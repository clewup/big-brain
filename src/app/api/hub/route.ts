import { hubService } from '@/db/handler'
import { NextRequest, NextResponse as response } from 'next/server'

export async function POST(request: NextRequest) {
    const body = await request.json()

    const createdHub = hubService.createHub(body)
    return response.json(createdHub)
}
