'use client'

import Modal from '@/components/Modal/Modal'
import { useNotification } from '@/contexts/NotificationContext/NotificationContext'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useApi from '@/lib/common/hooks/useApi/useApi'
import { AuthorType } from '@/types/authorTypes'
import { Post } from '@prisma/client'
import Avvvatars from 'avvvatars-react'
import { motion as m } from 'framer-motion'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'
import { Edit as EditIcon, Trash as DeleteIcon } from 'react-feather'

interface FullPostProps {
    post: Post
    author: AuthorType
}

const FullPost: FC<FullPostProps> = ({ post, author }) => {
    const { user, isAdmin } = useLockr()
    const { pushNotification } = useNotification()
    const { del } = useApi()
    const router = useRouter()

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
            <figure className="cursor-pointer">
                <img
                    src={post.image}
                    alt={post.title}
                    className="aspect-video max-h-[50vh] object-cover w-full object-center rounded-md"
                />
            </figure>
            <div className="py-2">
                <h2 className="text-4xl text-center py-5 font-semibold">{post.title}</h2>

                <p className="whitespace-pre-line py-5">{post.content}</p>

                <div className="flex flex-col items-center justify-center py-10">
                    <div className="justify-start py-2">
                        {post.categories.map((category, index) => (
                            <Link href={`/search?category=${category}`} key={index} className="underline">
                                {category}
                            </Link>
                        ))}
                    </div>

                    <p className="text-lg text-neutral">{moment(post.createdAt).format('DD/MM/YYYY')}</p>

                    <h2 className="flex gap-2 text-xl my-5 items-center">
                        {author.image ? <img src={author.image} /> : <Avvvatars value={author.name} />}
                        {author.name}
                    </h2>
                </div>

                {(isAdmin || post.createdBy === user?.email) && (
                    <div className="justify-end my-2 flex text-neutral gap-2">
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

export default FullPost
