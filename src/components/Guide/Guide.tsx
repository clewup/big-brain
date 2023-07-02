'use client'

import Modal from '@/components/Modal/Modal'
import { useNotification } from '@/contexts/NotificationContext/NotificationContext'
import { useLockr } from '@/lib/common/contexts/LockrContext/LockrContext'
import useApi from '@/lib/common/hooks/useApi/useApi'
import { GuideType } from '@/types/guideTypes'
import moment from 'moment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FC, useState } from 'react'

interface GuideProps {
    guide: GuideType
}

const Guide: FC<GuideProps> = ({ guide }) => {
    const { user, isAdmin } = useLockr()
    const { pushNotification } = useNotification()
    const { del } = useApi()
    const router = useRouter()

    const [isModalOpen, setModalOpen] = useState(false)

    async function deleteGuide() {
        await del(`/api/guide?id=${guide.id}`)
        setModalOpen(false)

        pushNotification({
            text: 'Guide deleted!',
            variant: 'error',
        })

        router.refresh()
        router.push('/')
    }

    return (
        <div>
            <figure>
                <img
                    src={guide.image}
                    alt={guide.title}
                    className="aspect-video max-h-[50vh] object-cover w-full object-center rounded-md"
                />
            </figure>

            <div className="py-2">
                <h2 className="text-4xl py-5 font-semibold">{guide.title}</h2>
                {/*//todo: guide section mapping*/}
                <div className="flex flex-col py-10">
                    <div className="justify-start py-2">
                        {guide.categories.map((category, index) => (
                            <Link
                                href={`/search?category=${category}`}
                                key={index}
                                className="font-semibold text-primary">
                                {category}
                            </Link>
                        ))}
                    </div>

                    <p className="text-lg text-neutral">{moment(guide.createdAt).format('DD/MM/YYYY')}</p>
                </div>
            </div>

            <Modal
                id="delete-guide"
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
                        onClick: deleteGuide,
                    },
                ]}
            />
        </div>
    )
}

export default Guide
