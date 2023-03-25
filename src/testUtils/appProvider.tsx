// Wraps the component being tested in the app provider/contexts.
import mockNextRouter from '@/testUtils/mocks/mockNextRouter';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import React, { ReactElement } from 'react';

export interface ProviderArgs {
    dummyArg: boolean;
}

export const appProvider = (component: ReactElement, providerArgs?: ProviderArgs) => {
    return <RouterContext.Provider value={mockNextRouter}>{component}</RouterContext.Provider>;
};
