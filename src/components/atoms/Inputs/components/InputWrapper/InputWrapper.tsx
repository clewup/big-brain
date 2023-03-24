import { FormGroup, FormLabel } from '@mui/material';
import { useTheme } from 'next-themes';
import React from 'react';

interface IProps {
    children: JSX.Element;
    label: string | undefined;
}

const InputWrapper: React.FC<IProps> = ({ children, label }) => {
    const { theme } = useTheme();

    return (
        <FormGroup>
            <FormLabel sx={{ color: theme === 'light' ? 'black' : 'white' }}>{label}</FormLabel>
            {children}
        </FormGroup>
    );
};
export default InputWrapper;
