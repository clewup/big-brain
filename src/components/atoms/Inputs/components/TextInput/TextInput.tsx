import InputWrapper from '@/components/atoms/Inputs/components/InputWrapper/InputWrapper';
import { InputAdornment, TextField } from '@mui/material';
import { FieldAttributes, FormikProps } from 'formik';
import React from 'react';

interface IProps {
    field?: FieldAttributes<any>;
    form?: FormikProps<any>;
    label?: string;
    disabled?: boolean;
    value?: unknown;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    type?: string;
    icon?: JSX.Element;
}

const TextInput: React.FC<IProps> = ({
    field,
    form,
    label,
    disabled,
    value,
    onChange,
    placeholder,
    type = 'text',
    icon,
}) => {
    return (
        <InputWrapper label={label} htmlFor={field.name}>
            <TextField
                {...field}
                error={form?.touched[field.name] && form?.errors[field.name]}
                type={type}
                disabled={disabled}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                variant={'standard'}
                helperText={form?.errors[field.name]}
                InputProps={{
                    style: {
                        backgroundColor: 'white',
                        textAlign: 'center',
                    },
                    startAdornment: <InputAdornment position={'end'}>{icon}</InputAdornment>,
                }}
                name={field.name}
                aria-label={field.name}
                data-testid={`${field.name}_input`}
            />
        </InputWrapper>
    );
};
export default TextInput;
