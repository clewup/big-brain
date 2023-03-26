import { UserType } from '@/types';
import React, { createContext, SetStateAction, useContext, useState } from 'react';

interface UserContextValues {
    user: UserType | undefined;
    setUser: React.Dispatch<SetStateAction<UserType | undefined>>
}

interface UserContextProps {
    children: JSX.Element;
    existingUser?: UserType;
}

const UserContext = createContext<UserContextValues>({} as UserContextValues);

const UserProvider = ({ children, existingUser }: UserContextProps) => {
    const [user, setUser] = useState<UserType | undefined>(existingUser);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
};

const useUser = () => {
    const context = useContext(UserContext);
    if (!context)
        throw new Error("useUser must be used within an UserProvider.")

    return context;
}

export {useUser, UserProvider};