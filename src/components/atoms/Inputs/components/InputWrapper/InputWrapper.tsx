import { FormGroup, FormLabel } from '@mui/material';
import { useTheme } from 'next-themes';
import React from 'react';

interface IProps {
    children: JSX.Element;
    label: string | undefined;
    htmlFor: string | undefined;
}

const InputWrapper: React.FC<IProps> = ({ children, label, htmlFor }) => {
    const { theme } = useTheme();

    return (
        <FormGroup>
            <FormLabel
                sx={{ color: theme === 'light' ? 'black' : 'white' }}
                htmlFor={htmlFor}
                data-testid={`${htmlFor}_label`}
            >
                {label}
            </FormLabel>
            {children}
        </FormGroup>
    );
};
export default InputWrapper;
