import prisma from '@/lib/prisma'
import postSchema from '@/lib/yup/schema/postSchema'
import { CreatePostType } from '@/types/postTypes'
import { decodeAccessToken, extractAccessToken } from '@/utils/functions/auth'
import postMapper from '@/utils/mappers/postMapper'
import { NextResponse as response } from 'next/server'

export async function POST(request: Request) {
    try {
        const requestData = await request.json()

        const authorizationHeader = await request.headers.get('Authorization')
        if (!authorizationHeader) {
            return response.json({ message: 'Missing authorization header' })
        }

        const accessToken = extractAccessToken(authorizationHeader)
        if (!accessToken) {
            return response.json({ message: 'Invalid access token' })
        }

        const decodedToken = decodeAccessToken(accessToken)
        if (!decodedToken) {
            return response.json({ message: 'Unable to decode the access token' })
        }

        const validatedPost = await validatePost(requestData)

        const createdPost = await prisma.post.create({
            include: { comments: true },
            data: {
                title: validatedPost.title,
                content: validatedPost.content,
                image: validatedPost.image,
                createdBy: decodedToken.email,
                updatedBy: decodedToken.email,
            },
        })
        const mappedPost = postMapper(createdPost)

        return response.json(mappedPost)
    } catch (exception: any) {
        return response.json({ message: exception.message })
    }
}

async function validatePost(requestData: any) {
    return (await postSchema.validate(requestData)) as CreatePostType
}
