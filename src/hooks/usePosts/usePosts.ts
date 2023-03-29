import { useAuth } from '@/contexts/AuthContext';
import getPosts from '@/requests/getPosts';
import getPostsByTag from '@/requests/getPostsByTag';
import { PostType } from '@/types';
import { useEffect, useState } from 'react';

interface IProps {
    tag?: string | string[];
}

const usePosts = ({ tag }: IProps) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {user} = useAuth();

    const fetchPosts = async () => {
        setLoading(true);

        getPosts({customer: user?.customer})
            .then(async (res) => setPosts(await res.json()))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    };

    const fetchPostsByTag = async (tag: string) => {
        setLoading(true);

        getPostsByTag(tag)
            .then(async (res) => setPosts(await res.json()))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (tag && typeof tag === 'string') {
            fetchPostsByTag(tag);
        } else {
            fetchPosts();
        }
    }, [tag]);

    return { posts, isLoading, error };
};
export default usePosts;
