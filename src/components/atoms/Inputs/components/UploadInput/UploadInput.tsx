import InputWrapper from '@/components/atoms/Inputs/components/InputWrapper/InputWrapper';
import postImage from '@/requests/postImage';
import { PhotoCamera } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FieldAttributes, FormikProps } from 'formik';
import React, { InputHTMLAttributes } from 'react';
import styles from './UploadInput.module.scss';

interface IProps {
    field?: FieldAttributes<any>;
    form?: FormikProps<any>;
    label?: string;
    disabled?: boolean;
    accept: InputHTMLAttributes<HTMLInputElement>['accept'];
}

const UploadInput: React.FC<IProps> = ({ field, form, label, disabled, accept }) => {
    const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET || 'hgv24xh6';
    const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || 'dliog6kq6';

    const uploadImage = async (image: Blob | undefined) => {
        if (!image) return;

        const data = new FormData();
        data.append('file', image);
        data.append('upload_preset', UPLOAD_PRESET);
        data.append('cloud_name', CLOUD_NAME);

        postImage(data)
            .then(async (res) => {
                const data = await res.json();
                form?.setFieldValue(field.name, data.url);
            })
            .catch((err) => form?.setFieldError(field.name, err));
    };

    return (
        <InputWrapper label={label} htmlFor={field.name}>
            <IconButton component="label" disabled={disabled} className={styles.upload_button}>
                <input
                    hidden
                    accept={accept}
                    type="file"
                    onChange={(e) => {
                        uploadImage(e.target.files?.[0]);
                    }}
                    disabled={disabled}
                    name={field.name}
                    aria-label={field.name}
                    data-testid={`${field.name}_input`}
                />
                <PhotoCamera fontSize={'large'} />
            </IconButton>
        </InputWrapper>
    );
};
export default UploadInput;
