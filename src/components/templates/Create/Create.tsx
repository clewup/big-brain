import styles from './Create.module.scss';
import { useState } from 'react';
import Password from '@/components/molecules/Password/Password';
import BlogPostForm from '@/components/organisms/BlogPostForm/BlogPostForm';

const Create = () => {
    const CREATE_PASSWORD = 'temp_pass';

    const [isSignedIn, setSignedIn] = useState(false);

    const handleSignIn = (password: string) => {
        if (password === CREATE_PASSWORD) {
            setSignedIn(true);
            return true;
        } else {
            return false;
        }
    };

    return (
        <div className={styles.create}>{!isSignedIn ? <Password handleSignIn={handleSignIn} /> : <BlogPostForm />}</div>
    );
};
export default Create;
