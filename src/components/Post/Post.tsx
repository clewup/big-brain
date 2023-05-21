import { Post } from '@prisma/client'
import Link from 'next/link'
import { FC } from 'react'

interface PostProps {
    post: Post
    isLatest?: boolean
}

const Post: FC<PostProps> = ({ post, isLatest = false }) => {
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
                <p>{post.content.substring(0, 30)}</p>
                <div className="card-actions justify-end">
                    {post.categories.map((category, index) => (
                        <div key={index} className="badge badge-outline">
                            {category}
                        </div>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default Post
