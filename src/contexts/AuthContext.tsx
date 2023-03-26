import postLogin from '@/requests/postLogin';
import { AccessTokenType, UserLoginType, UserType } from '@/types';
import jwtDecode from 'jwt-decode';
import React, { createContext, SetStateAction, useContext, useState } from 'react';

interface AuthContextValues {
    accessToken: string | undefined;
    setAccessToken: React.Dispatch<SetStateAction<string | undefined>>
    user: UserType | undefined;
    setUser: React.Dispatch<SetStateAction<UserType | undefined>>

    login: (userLogin: UserLoginType) => Promise<void>;
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

    const login = async (userLogin: UserLoginType) => {
        postLogin(userLogin).then(async (res) => {
            if (res.status === 200 && res.body) {
                const data = await res.json();
                setAccessToken(data.accessToken);

                const decodedAccessToken = jwtDecode<AccessTokenType>(data.accessToken);
                setUser({
                    id: decodedAccessToken.id,
                    email: decodedAccessToken.email,
                    role: decodedAccessToken.role
                })
            }
        }).catch((err) => null);
    }

    const logout = async () => {
        setAccessToken(undefined);
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