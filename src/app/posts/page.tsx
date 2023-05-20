'use client'

import Filter from '@/components/Filter/Filter'
import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import React, { useState } from 'react'
import { Post as PrismaPost } from '.prisma/client'

export default function Posts() {
    const [posts, setPosts] = useState<PrismaPost[]>([])
    const [isLoading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    return (
        <PageWrapper className="relative">
            <h1 className="text-8xl font-satisfice">READ ALL ABOUT IT!</h1>
            <div className="flex flex-col gap-5 pb-20">
                <Filter setPosts={setPosts} setLoading={setLoading} />

                {isLoading ? (
                    <div className="w-full h-60 flex justify-center items-center">
                        <p className="text-lg">Printing Press</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-5">
                        {posts.map((post, index) => (
                            <Post key={index} post={post} isLatest={index === 0} />
                        ))}
                    </div>
                )}

                <div className="btn-group absolute bottom-0 mb-5">
                    <button className="btn btn-active">1</button>
                    <button className="btn">2</button>
                    <button className="btn">3</button>
                    <button className="btn">4</button>
                </div>
            </div>
        </PageWrapper>
    )
}
