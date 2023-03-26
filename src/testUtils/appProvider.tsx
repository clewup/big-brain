// Wraps the component being tested in the app provider/contexts.
import { AuthProvider } from '@/contexts/AuthContext';
import mockNextRouter from '@/testUtils/mocks/mockNextRouter';
import mockUser from '@/testUtils/mocks/mockUser';
import { UserType } from '@/types';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import React, { ReactElement } from 'react';

export interface ProviderArgs {
    initialAccessToken?: string;
    initialUser?: UserType;
}

export const appProvider = (component: ReactElement, providerArgs?: ProviderArgs) => {

    const accessToken = providerArgs?.initialAccessToken === undefined ? undefined : "mockAccessToken";
    const user = providerArgs?.initialUser ?? mockUser;

    return (
        <AuthProvider providerArgs={{initialAccessToken: accessToken, initialUser: user}}>
                <RouterContext.Provider value={mockNextRouter}>{component}</RouterContext.Provider>
        </AuthProvider>
    )
};
