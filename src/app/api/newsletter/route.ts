import constants from '@/constants/constants'
import sgClient from '@sendgrid/client'
import { NextRequest, NextResponse as response } from 'next/server'

sgClient.setApiKey(constants.SENDGRID_API_KEY)

export async function POST(request: NextRequest) {
    const body = await request.json()

    const { errors, isValid } = validate(body)

    if (!isValid) {
        return response.json(
            {
                message: `Error: ${errors.join(', ')}`,
            },
            { status: 400 }
        )
    }

    const [sgResponse, sgResponseBody] = await sgClient.request({
        body: {
            contacts: [
                {
                    email: body.email,
                },
            ],
        },
        method: 'PUT',
        url: `/v3/marketing/contacts`,
    })

    if (sgResponse.statusCode === 400 || sgResponse.statusCode === 500) {
        return response.json(
            {
                message: `Error: ${sgResponseBody.message}`,
            },
            { status: 400 }
        )
    }

    return response.json({}, { status: 200 })
}

function validate(body: any) {
    const errors: string[] = []

    if (!body.email) errors.push('email')

    return {
        errors,
        isValid: errors.length === 0,
    }
}
