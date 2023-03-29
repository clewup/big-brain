import { useAuth } from '@/contexts/AuthContext';
import getPostById from '@/requests/getPostById';
import { PostType } from '@/types';
import { useEffect, useState } from 'react';

interface IProps {
    id?: number;
}

const usePost = ({ id }: IProps) => {
    const [post, setPost] = useState<PostType>();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {user} = useAuth();

    const fetchPost = (id: number) => {
        setLoading(true);

        getPostById({id})
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
