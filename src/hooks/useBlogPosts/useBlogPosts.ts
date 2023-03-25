import getPosts from '@/requests/getPosts';
import getPostsByCategory from '@/requests/getPostsByCategory';
import { BlogPostType } from '@/types';
import { useEffect, useState } from 'react';

interface IProps {
    category?: string | string[];
}

const useBlogPosts = ({ category }: IProps) => {
    const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBlogPosts = async () => {
        setLoading(true);

        getPosts()
            .then(async (res) => setBlogPosts(await res.json()))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    };

    const fetchBlogPostsByCategory = async (category: string) => {
        setLoading(true);

        getPostsByCategory(category)
            .then(async (res) => setBlogPosts(await res.json()))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (category && typeof category === 'string') {
            fetchBlogPostsByCategory(category);
        } else {
            fetchBlogPosts();
        }
    }, [category]);

    return { blogPosts, isLoading, error };
};
export default useBlogPosts;
