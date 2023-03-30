import getPostById from '@/requests/getPostById';
import { PostType } from '@/types';
import { useEffect, useState } from 'react';

const usePost = (id: number | undefined) => {
    const [post, setPost] = useState<PostType>();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPost = (id: number) => {
        setLoading(true);

        getPostById(id)
            .then(async (res) => setPost(await res.json()))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (id) {
            fetchPost(id);
        }
    }, [id]);

    return { post, isLoading, error };
};
export default usePost;
