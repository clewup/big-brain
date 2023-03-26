// Wraps the component being tested in the app provider/contexts.
import { AuthProvider } from '@/contexts/AuthContext';
import { UserProvider } from '@/contexts/UserContext';
import mockNextRouter from '@/testUtils/mocks/mockNextRouter';
import mockUser from '@/testUtils/mocks/mockUser';
import { UserType } from '@/types';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import React, { ReactElement } from 'react';

export interface ProviderArgs {
    user?: UserType;
    accessToken?: string;
}

export const appProvider = (component: ReactElement, providerArgs?: ProviderArgs) => {

    const accessToken = providerArgs?.accessToken === undefined ? undefined : "mockAccessToken";
    const user = providerArgs?.user ?? mockUser;

    return (
        <AuthProvider existingAccessToken={accessToken}>
            <UserProvider existingUser={user}>
                <RouterContext.Provider value={mockNextRouter}>{component}</RouterContext.Provider>
            </UserProvider>
        </AuthProvider>
    )
};
