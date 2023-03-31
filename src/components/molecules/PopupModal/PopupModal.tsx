import { Button, Modal } from '@mui/material';
import { motion } from 'framer-motion';
import React, { SetStateAction } from 'react';
import styles from './PopupModal.module.scss';

interface IProps {
    isOpen: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    children: JSX.Element;
}
const PopupModal: React.FC<IProps> = ({ isOpen = false, setOpen, children }) => {
    const handleClose = () => {
        setOpen(false);
    };

    const modalVariants = {
        hidden: {},
        visible: {},
        exit: {
            opacity: 0,
            y: '-100vh',
            transition: {
                duration: 0.3,
            },
        },
    };

    return (
        <>
            {isOpen && (
                <div className={styles.modal_overlay}>
                    <Modal open={true} onClose={handleClose}>
                        <motion.div
                            className={styles.modal}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={modalVariants}
                        >
                            {children}
                            <Button onClick={handleClose}>Close Modal</Button>
                        </motion.div>
                    </Modal>
                </div>
            )}
        </>
    );
};

export default PopupModal;
