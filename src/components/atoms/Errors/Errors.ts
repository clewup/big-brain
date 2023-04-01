import NotFound from '@/components/atoms/Errors/components/NotFound/NotFound';
import SignIn from '@/components/atoms/Errors/components/SignIn/SignIn';

export const Errors = {
    SignIn: (functionality: string) => SignIn({ functionality }),
    NotFound: (functionality: string) => NotFound({ functionality }),
};
