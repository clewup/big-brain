import { useVariant } from '@/contexts/VariantContext';
import { RolesEnum, RoutesEnum, UrlsEnum } from '@/enums';
import postAccessToken from '@/requests/postAccessToken';
import { AccessTokenType, UserType } from '@/types';
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { ComponentType, createContext, SetStateAction, useContext, useEffect, useState } from 'react';

interface AuthContextValues {
    accessToken: string | undefined;
    setAccessToken: React.Dispatch<SetStateAction<string | undefined>>;
    user: UserType | undefined;
    setUser: React.Dispatch<SetStateAction<UserType | undefined>>;
    error: string | undefined;

    login: (code: string) => Promise<void>;
    logout: () => void;
    isLoggedIn: boolean;
}

interface AuthContextProps {
    children: JSX.Element;
    providerArgs?: {
        initialAccessToken: string | undefined;
        initialUser: UserType | undefined;
    };
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

const AuthProvider = ({ children, providerArgs }: AuthContextProps) => {
    const [accessToken, setAccessToken] = useState<string | undefined>(providerArgs?.initialAccessToken);
    const [user, setUser] = useState<UserType | undefined>(providerArgs?.initialUser);
    const [error, setError] = useState<string>();

    const { setVariants } = useVariant();

    const login = async (code: string) => {
        postAccessToken(code)
            .then(async (res) => {
                if (res.status === 200 && res.body) {
                    const data = await res.json();
                    setAccessToken(data.access_token);

                    const decodedAccessToken = jwtDecode<AccessTokenType>(data.access_token);
                    setUser({
                        id: decodedAccessToken.id,
                        email: decodedAccessToken.email,
                        customer: decodedAccessToken.customer,
                        role: decodedAccessToken.role,
                    });
                    setVariants(decodedAccessToken.variants);
                }
            })
            .catch((err) => setError(err.message));
    };

    const logout = async () => {
        setAccessToken(undefined);
        setUser(undefined);
        setVariants([]);
    };

    const isLoggedIn = !!accessToken;

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser, error, login, logout, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider.');

    return context;
};

const withAuth = (Component: ComponentType, roleRequirement?: RolesEnum) => {

    const AuthWrapper: ComponentType = (props: any) => {
        const {accessToken, user} = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!accessToken || !user) {
                window.location.href = UrlsEnum.AUTH;
            }
        }, [accessToken, user])


        if (roleRequirement && user && user.role !== roleRequirement) {
            router.push({pathname: RoutesEnum.HOME})
            return null;
        }

        return <Component {...props} />
    };

    return AuthWrapper;
}

export { useAuth, AuthProvider, withAuth };
