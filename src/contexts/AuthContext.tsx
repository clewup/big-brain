import { useVariant } from '@/contexts/VariantContext';
import postAccessToken from '@/requests/postAccessToken';
import { AccessTokenType, UserType } from '@/types';
import jwtDecode from 'jwt-decode';
import React, { createContext, SetStateAction, useContext, useState } from 'react';

interface AuthContextValues {
    accessToken: string | undefined;
    setAccessToken: React.Dispatch<SetStateAction<string | undefined>>
    user: UserType | undefined;
    setUser: React.Dispatch<SetStateAction<UserType | undefined>>

    login: (code: string) => Promise<void>;
    logout: () => void;
    isLoggedIn: boolean;
}

interface AuthContextProps {
    children: JSX.Element;
    providerArgs?: {
        initialAccessToken: string | undefined;
        initialUser: UserType | undefined,
    };
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

const AuthProvider = ({ children, providerArgs }: AuthContextProps) => {
    const [accessToken, setAccessToken] = useState<string | undefined>(providerArgs?.initialAccessToken);
    const [user, setUser] = useState<UserType | undefined>(providerArgs?.initialUser);

    const {setVariants} = useVariant();

    const login = async (code: string) => {
        postAccessToken(code).then(async (res) => {
            if (res.status === 200 && res.body) {
                const data = await res.json();
                setAccessToken(data.access_token);

                const decodedAccessToken = jwtDecode<AccessTokenType>(data.access_token);
                setUser({
                    id: decodedAccessToken.id,
                    email: decodedAccessToken.email,
                    customer: decodedAccessToken.customer,
                    role: decodedAccessToken.role,
                })
                setVariants(decodedAccessToken.variants)
            }
        }).catch((err) => null);
    }

    const logout = async () => {
        setAccessToken(undefined);
        setUser(undefined);
        setVariants([]);
    }

    const isLoggedIn = !!accessToken;

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, user, setUser, login, logout, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuth must be used within an AuthProvider.")

    return context;
}

export {useAuth, AuthProvider}