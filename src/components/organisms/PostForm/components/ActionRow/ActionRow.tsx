import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import React from 'react';
import styles from './ActionRow.module.scss';

interface IProps {
    onCancel: () => void;
    isSubmitting: boolean;
}

const ActionRow: React.FC<IProps> = ({ onCancel, isSubmitting }) => {
    return (
        <div className={styles.action_row} data-testid={'post_form_action_row'}>
            <Button variant={'contained'} onClick={onCancel}>
                Cancel
            </Button>
            <LoadingButton type={'submit'} variant={'contained'} color={'success'} loading={isSubmitting}>
                Save
            </LoadingButton>
        </div>
    );
};
export default ActionRow;
