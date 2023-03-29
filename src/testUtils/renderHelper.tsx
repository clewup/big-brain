import { appProvider, ProviderArgs } from '@/testUtils/appProvider';
import { render } from '@testing-library/react';
import { Form, Formik } from 'formik';
import React, { ReactElement } from 'react';

const renderHelper = (component: ReactElement, options?: object, providerArgs?: ProviderArgs) => {
    render(appProvider(component, providerArgs), { ...options });
};

interface FormikProps {
    initialValues: {
        test: true;
    };
    onSubmit: jest.Mock;
}

export const wrapWithFormik = (component: ReactElement, formikProps: FormikProps) => {
    return (
        <Formik initialValues={formikProps.initialValues} onSubmit={formikProps.onSubmit}>
            <Form>{component}</Form>
        </Formik>
    );
};

export default renderHelper;
