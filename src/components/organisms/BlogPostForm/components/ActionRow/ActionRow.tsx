import { Button } from '@mui/material';
import React from 'react';
import styles from './ActionRow.module.scss';

interface IProps {
    onCancel: () => void;
}

const ActionRow: React.FC<IProps> = ({ onCancel }) => {
    return (
        <div className={styles.action_row} data-testid={'blog_post_form_action_row'}>
            <Button variant={'contained'} onClick={onCancel}>
                Cancel
            </Button>
            <Button type={'submit'} variant={'contained'} color={'success'}>
                Save
            </Button>
        </div>
    );
};
export default ActionRow;