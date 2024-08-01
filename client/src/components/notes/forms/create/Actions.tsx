import { LocalOffer } from "@mui/icons-material";
import { Box, Tooltip, IconButton } from "@mui/material";
import SaveButton from "../../SaveButton";
import { defaultBorderColor } from "./CreateNoteForm";

interface ActionsProps {
    handleSave: () => void;
    formStatus: {
        isSaving: boolean;
        isSaved: boolean;
        isErrorSaving: boolean;
    };
    toggleTagVisibility: () => void;
    isAddTagVisible: boolean;
}
const Actions = ({ handleSave, formStatus, toggleTagVisibility, isAddTagVisible }: ActionsProps) => (
    <Box
        sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            border: `1px solid ${defaultBorderColor}`,
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            p: 1,
        }}
    >
        <SaveButton
            color="inherit"
            variant="text"
            loading={formStatus.isSaving}
            onClick={handleSave}
        />
        <Tooltip title={isAddTagVisible ? 'Close add tag' : 'Add tags'}>
            <IconButton
                color="primary"
                size="small"
                aria-label="add-tags"
                onClick={toggleTagVisibility}
            >
                <LocalOffer />
            </IconButton>
        </Tooltip>
    </Box>
);


export default Actions;