import InputWrapper from '@/components/atoms/Inputs/components/InputWrapper/InputWrapper';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { FieldAttributes, FormikProps } from 'formik';
import React from 'react';

interface IProps {
    field: FieldAttributes<unknown>;
    form: FormikProps<unknown>;
    label?: string;
    disabled?: boolean;
    value?: unknown;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    placeholder?: string;
    type?: string;
    icon?: JSX.Element;
    rows?: number;
}

const TextAreaInput: React.FC<IProps> = ({
    field,
    form,
    label,
    disabled,
    value,
    onChange,
    placeholder,
    type = 'text',
    icon,
    rows = 4,
}) => {
    return (
        <InputWrapper label={label} htmlFor={field.name}>
            <TextField
                {...field as TextFieldProps}
                error={form?.touched[field.name as keyof typeof form.touched] && !!form?.errors[field.name as keyof typeof form.errors]}
                type={type}
                disabled={disabled}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                variant={'standard'}
                helperText={form?.touched[field.name as keyof typeof form.touched] && form?.errors[field.name as keyof typeof form.errors]}
                InputProps={{
                    style: {
                        backgroundColor: 'white',
                        textAlign: 'center',
                    },
                    startAdornment: <InputAdornment position={'end'}>{icon}</InputAdornment>,
                }}
                multiline
                rows={rows}
                name={field.name}
                aria-label={field.name}
                data-testid={`${field.name}_input`}
            />
        </InputWrapper>
    );
};
export default TextAreaInput;
