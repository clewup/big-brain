import getPostById from '@/requests/getPostById';
import { BlogPostType } from '@/types';
import React, { useEffect, useState } from 'react';

interface IProps {
    id?: string;
}

const useBlogPost = ({ id }: IProps) => {
    const [blogPost, setBlogPost] = useState<BlogPostType>();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBlogPost = (id: string) => {
        setLoading(true);

        getPostById(id)
            .then(async (res) => setBlogPost(await res.json()))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (id) {
            fetchBlogPost(id);
        }
    }, [id]);

    return { blogPost, isLoading, error };
};
export default useBlogPost;
