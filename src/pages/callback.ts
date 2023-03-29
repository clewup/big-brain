import { useAuth } from '@/contexts/AuthContext';
import { RoutesEnum } from '@/enums';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Callback = () => {
    const router = useRouter();
    const { login, isLoggedIn } = useAuth();

    useEffect(() => {
        const code = router.query.code as string;

        if (code && !isLoggedIn) {
            login(code).then(() => {
                router.push(RoutesEnum.HOME);
            });
        }
    }, [router, router.query.code, isLoggedIn, login]);
};
export default Callback;
