import PageWrapper from '@/components/PageWrapper/PageWrapper'
import Post from '@/components/Post/Post'
import React from 'react'

export default async function Home() {
    const posts = [
        {
            title: 'Post 1',
            image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80',
            content: '',
            categories: ['cat1', 'cat2'],
            comments: [],
        },
        {
            title: 'Post 1',
            image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80',
            content: '',
            categories: ['cat1', 'cat2'],
            comments: [],
        },
        {
            title: 'Post 1',
            image: 'https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1336&q=80',
            content: '',
            categories: ['cat1', 'cat2'],
            comments: [],
        },
    ]

    return (
        <PageWrapper className="flex">
            <div className="w-1/4 h-full min-h-screen-header">
                <h1 className="text-6xl font-satisfice">THE LATEST</h1>
            </div>
            <span className="divider divider-horizontal" />
            <div className="w-full">
                <div className="grid grid-cols-3 w-full gap-5">
                    {posts.map((post, index) => (
                        <Post key={index} post={post} isLatest={index === 0} />
                    ))}
                </div>
            </div>
        </PageWrapper>
    )
}
