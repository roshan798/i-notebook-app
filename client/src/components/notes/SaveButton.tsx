import * as React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import type { ButtonProps } from '@mui/material/Button';
interface SaveButtonProps extends ButtonProps {
    loading: boolean;
    onClick: () => void;
    size?: 'small' | 'medium' | 'large';
    variant?: 'text' | 'outlined' | 'contained';
}

const SaveButton: React.FC<SaveButtonProps> = ({
    loading,
    onClick,
    ...props
}) => {
    return (
        <LoadingButton
            onClick={onClick}
            loading={loading}
            loadingPosition="start"
            startIcon={<SaveIcon />}
            {...props}
        >
            <span>Save</span>
        </LoadingButton >
    );
};

export default SaveButton;
