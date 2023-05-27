'use client'

import Modal from '@/components/Modal/Modal'
import { useNotification } from '@/contexts/NotificationContext/NotificationContext'
import useApi from '@/hooks/useApi/useApi'
import { useLockr } from '@/lib/lockr-auth/contexts/LockrContext'
import { AuthorType } from '@/types/authorTypes'
import { Post } from '@prisma/client'
import Avvvatars from 'avvvatars-react'
import { motion as m } from 'framer-motion'
import moment from 'moment/moment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'
import { Edit as EditIcon, Trash as DeleteIcon } from 'react-feather'

interface PostProps {
    post: Post
    isLatest?: boolean
    isFullPost?: boolean
    author?: AuthorType
}

const Post: FC<PostProps> = ({ post, isLatest = false, isFullPost = false, author }) => {
    const { user, isAdmin } = useLockr()
    const { del } = useApi()
    const router = useRouter()
    const { pushNotification } = useNotification()

    const [isModalOpen, setModalOpen] = useState(false)

    async function deletePost() {
        await del(`/api/post?id=${post.id}`)
        setModalOpen(false)

        pushNotification({
            text: 'Post deleted!',
            variant: 'error',
        })

        router.refresh()
        router.push('/')
    }

    return (
        <m.div
            className="card w-full bg-base-100 shadow-xl"
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
                    className="aspect-video max-h-[50vh] object-cover w-full object-center"
                />
            </figure>
            <div className="card-body">
                {author && (
                    <h2 className="card-title">
                        {author.image ? <img src={author.image} /> : <Avvvatars value={author.name} />}
                        {author.name}
                    </h2>
                )}
                <h2 className="card-title">
                    {post.title}
                    <p className="text-neutral text-lg">{moment(post.createdAt).format('DD/MM/YYYY')}</p>
                    {isLatest && <div className="badge badge-secondary">NEW</div>}
                </h2>
                {isFullPost ? (
                    <p className="whitespace-pre-line">{post.content}</p>
                ) : (
                    <p>{post.content.substring(0, 200)}...</p>
                )}
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
        </m.div>
    )
}

export default Post
