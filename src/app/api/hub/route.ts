import { hubService } from '@/db/handler'
import { NextRequest, NextResponse as response } from 'next/server'

export async function PATCH(request: NextRequest) {
    const body = await request.json()
    const upsertedHub = await hubService.upsertHub(body)
    return response.json(upsertedHub)
}
