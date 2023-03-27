import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
    const router = useRouter();
    const {login, user, isLoggedIn} = useAuth();

    console.log(user);
    console.log(isLoggedIn);

    useEffect(() => {
        const code = router.query.code as string;

        if(code) {
            login(code);
        }
    }, [router.query.code])

    return <></>
}
export default Home;