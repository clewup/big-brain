'use client'

import { Post } from '@prisma/client'
import { motion as m } from 'framer-motion'
import moment from 'moment/moment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface PostProps {
    post: Post
}

const Post: FC<PostProps> = ({ post }) => {
    const router = useRouter()

    return (
        <m.div
            className="w-full"
            variants={{
                hidden: {
                    y: 75,
                    opacity: 0,
                },
                visible: {
                    y: 0,
                    opacity: 1,
                },
            }}
            initial="hidden"
            animate="visible">
            <figure onClick={() => router.push(`/post/${post.id}`)} className="cursor-pointer">
                <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-video max-h-[50vh] object-cover w-full object-center rounded-md"
                />
            </figure>
            <div className="py-2">
                <h2 className="text-2xl font-semibold">{post.title}</h2>

                <p className="py-5">{post.content.substring(0, 150)}...</p>

                <div className="justify-start pb-4">
                    {post.categories.map((category, index) => (
                        <Link href={`/search?category=${category}`} key={index} className="font-semibold text-primary">
                            {category}
                        </Link>
                    ))}
                </div>

                <p className="text-lg text-neutral">{moment(post.createdAt).format('DD/MM/YYYY')}</p>
            </div>
        </m.div>
    )
}

export default Post
