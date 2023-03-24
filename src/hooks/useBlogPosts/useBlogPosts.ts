import { EndpointsEnum, HttpMethodsEnum } from '@/enums';
import { useEffect, useState } from 'react';
import { BlogPostType } from '@/types';

interface IProps {
    category?: string | string[];
}

const useBlogPosts = ({ category }: IProps) => {
    const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchBlogPosts = async () => {
        setLoading(true);

        fetch(EndpointsEnum.POST, {
            method: HttpMethodsEnum.GET,
        })
            .then(async (res) => setBlogPosts(await res.json()))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    };

    const fetchBlogPostsByCategory = async (category: string) => {
        setLoading(true);

        fetch(EndpointsEnum.POST_BY_CATEGORY(category), {
            method: HttpMethodsEnum.GET,
        })
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
