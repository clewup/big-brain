'use client'

import Modal from '@/components/Modal/Modal'
import { useNotification } from '@/contexts/NotificationContext/NotificationContext'
import useApi from '@/hooks/useApi/useApi'
import { useLockr } from '@/lib/lockr-auth/contexts/LockrContext'
import { Post } from '@prisma/client'
import moment from 'moment/moment'
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
    const { user, isAdmin } = useLockr()
    const { del } = useApi()
    const router = useRouter()
    const { pushNotification } = useNotification()

    const [isModalOpen, setModalOpen] = useState(false)

    async function deletePost() {
        const deletedResponse = await del(`/api/post?id=${post.id}`)
        const deletedData = await deletedResponse.json()

        if (!deletedResponse.ok) throw new Error(deletedData.error)

        setModalOpen(false)

        pushNotification({
            text: 'Post deleted!',
            variant: 'error',
        })

        router.refresh()
        router.push('/')
    }

    return (
        <div className="card w-full bg-base-100 shadow-xl">
            <figure onClick={() => router.push(`/post/${post.id}`)} className="cursor-pointer">
                <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-video max-h-[50vh] object-cover w-full object-center"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {post.title}
                    <p className="text-neutral text-lg">{moment(post.createdAt).format('DD/MM/YYYY')}</p>
                    {isLatest && <div className="badge badge-secondary">NEW</div>}
                </h2>
                {isFullPost ? <p>{post.content}</p> : <p>{post.content.substring(0, 200)}...</p>}
                <div className="card-actions justify-start">
                    {post.categories.map((category, index) => (
                        <Link href={`/posts?category=${category}`} key={index} className="text-secondary">
                            {category}
                        </Link>
                    ))}
                </div>

                {isFullPost && (isAdmin || post.createdBy === user?.email) && (
                    <div className="card-actions justify-end my-2">
                        <Link href={`/write?id=${post.id}`}>
                            <EditIcon />
                        </Link>
                        <DeleteIcon onClick={() => setModalOpen(true)} />
                    </div>
                )}
            </div>

            <Modal
                id="delete-post"
                isOpen={isModalOpen}
                title="Are you sure?"
                text="This action can not be undone."
                buttons={[
                    {
                        text: 'No',
                    },
                    {
                        text: 'Yes',
                        variant: 'error',
                        onClick: deletePost,
                    },
                ]}
            />
        </div>
    )
}

export default Post
