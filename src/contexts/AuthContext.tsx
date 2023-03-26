import { useUser } from '@/contexts/UserContext';
import postLogin from '@/requests/postLogin';
import { UserLoginType } from '@/types';
import React, { createContext, SetStateAction, useContext, useState } from 'react';

interface AuthContextValues {
    accessToken: string | undefined;
    setAccessToken: React.Dispatch<SetStateAction<string | undefined>>

    login: (userLogin: UserLoginType) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

interface AuthContextProps {
    children: JSX.Element;
    existingAccessToken?: string;
}

const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

const AuthProvider = ({ children, existingAccessToken }: AuthContextProps) => {
    const [accessToken, setAccessToken] = useState<string | undefined>(existingAccessToken);

    const {user, setUser} = useUser()

    const login = async (userLogin: UserLoginType) => {
        postLogin(userLogin).then(async (res) => {
            if (res.status === 200 && res.body) {
                const data = await res.json();
                setAccessToken(data.accessToken);
                setUser(data.user)
            }
        }).catch((err) => null);
    }

    const logout = async () => {
        setAccessToken(undefined);
        setUser(undefined);
    }

    const isLoggedIn = !!user;

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, login, logout, isLoggedIn}}>
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