import { appProvider, ProviderArgs } from '@/testUtils/appProvider';
import { render } from '@testing-library/react';
import { ReactElement } from 'react';

const renderHelper = (component: ReactElement, options?: any, providerArgs?: ProviderArgs) => {
    render(appProvider(component, providerArgs), { ...options });
};

export default renderHelper;
