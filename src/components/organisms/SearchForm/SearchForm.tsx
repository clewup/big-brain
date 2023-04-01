import { Inputs } from '@/components/atoms/Inputs/Inputs';
import { SearchFormFields } from '@/components/organisms/SearchForm/utils/formHelpers';
import { RoutesEnum } from '@/enums';
import { PostSearchFormValues } from '@/types/postTypes';
import { Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './SearchForm.module.scss';

const SearchForm = () => {
    const router = useRouter();

    const initialValues: PostSearchFormValues = {
        [SearchFormFields.SEARCH]: (router.query.search as string) || '',
    };

    const handleSubmit = (values: PostSearchFormValues) => {
        router.push({ pathname: RoutesEnum.POSTS, query: { search: values.search } });
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange }) => {
                return (
                    <Form className={styles.search_form}>
                        <Field
                            name={SearchFormFields.SEARCH}
                            component={Inputs.TEXT}
                            onChange={handleChange}
                            value={values.search}
                        />

                        <span>
                            <Button type={'submit'} variant={'contained'} color={'success'}>
                                Search
                            </Button>
                        </span>
                    </Form>
                );
            }}
        </Formik>
    );
};
export default SearchForm;
