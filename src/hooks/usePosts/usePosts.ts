import getPosts from '@/requests/getPosts';
import getPostsBySearch from '@/requests/getPostsBySearch';
import getPostsByTag from '@/requests/getPostsByTag';
import { PostType } from '@/types';
import { useEffect, useState } from 'react';

interface IProps {
    tag?: string | string[];
    search?: string | string[];
}

const usePosts = ({ tag, search }: IProps) => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPosts = async () => {
        setLoading(true);

        getPosts()
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

    const fetchPostsBySearch = async (search: string) => {
        setLoading(true);

        getPostsBySearch(search)
            .then(async (res) => setPosts(await res.json()))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (tag && typeof tag === 'string') {
            fetchPostsByTag(tag);
        } else if (search && typeof search === 'string') {
            fetchPostsBySearch(search);
        } else {
            fetchPosts();
        }
    }, [tag, search]);

    return { posts, isLoading, error };
};
export default usePosts;
