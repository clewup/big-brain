import { UserType } from '@/lib/lockr-auth/types/userTypes'
import { Comment } from '@prisma/client'
import Avvvatars from 'avvvatars-react'
import moment from 'moment'
import React, { FC } from 'react'

interface CommentProps {
    comment: Comment
    user: UserType
}

const Comment: FC<CommentProps> = ({ comment, user }) => {
    return (
        <div className="w-full h-fit flex flex-col gap-2">
            <p className="text-2xl">{comment.content}</p>
            <div className="flex gap-2 items-center">
                {user.image ? (
                    <span className="avatar w-7 h-7">
                        <img src={user.image} alt={user.name} className="mask mask-squircle" />
                    </span>
                ) : (
                    <Avvvatars value={user.email} size={40} />
                )}

                <p className="text-lg">{user.name}</p>
            </div>
            <p className="text-neutral">{moment(comment.updatedAt).format('DD/MM/YYYY HH:mm')}</p>
        </div>
    )
}

export default Comment
