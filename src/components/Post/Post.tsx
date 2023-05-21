'use client'

import Toast from '@/components/Toast/Toast'
import useApi from '@/hooks/useApi/useApi'
import { useLockr } from '@/lib/lockr-auth/contexts/LockrContext'
import { Post } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'
import { Edit as EditIcon, Trash as DeleteIcon } from 'react-feather'

interface PostProps {
    post: Post
    isLatest?: boolean
    isFullPost?: boolean
}

const Post: FC<PostProps> = ({ post, isLatest = false, isFullPost = false }) => {
    const { isAdmin } = useLockr()
    const { del } = useApi()
    const router = useRouter()

    const [isDeleted, setDeleted] = useState(false)

    async function deletePost() {
        const deletedResponse = await del(`/api/post?id=${post.id}`)
        const deletedData = await deletedResponse.json()

        if (!deletedResponse.ok) throw new Error(deletedData.error)

        setDeleted(true)
    }

    return (
        <Link href={`/post/${post.id}`} className="card w-full bg-base-100 shadow-xl">
            <figure>
                <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-video max-h-[50vh] object-cover w-full object-center"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {post.title}
                    {isLatest && <div className="badge badge-secondary">NEW</div>}
                </h2>
                {isFullPost ? <p>{post.content}</p> : <p>{post.content.substring(0, 30)}</p>}
                <div className="card-actions justify-end">
                    {post.categories.map((category, index) => (
                        <div key={index} className="badge badge-outline">
                            {category}
                        </div>
                    ))}
                </div>

                {isFullPost && isAdmin && (
                    <div className="card-actions justify-end">
                        <Link href={`/create?id=${post.id}`}>
                            <EditIcon />
                        </Link>
                        <DeleteIcon onClick={deletePost} />
                    </div>
                )}
            </div>

            {isDeleted && <Toast text="Post successfully deleted." variant="error" callback={() => router.push('/')} />}
        </Link>
    )
}

export default Post
