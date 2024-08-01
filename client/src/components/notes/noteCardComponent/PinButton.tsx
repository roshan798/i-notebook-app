import { PushPin, PushPinOutlined } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";
import { updateOneField } from "../../../http/notes";
import { pinNote } from "../../../store/notesSlice";
import { useDispatch } from "react-redux";

const PinButton: React.FC<{ pinned: boolean, notesId: string }> = ({ pinned, notesId }) => {
    const dispatch = useDispatch();
    const [pinPending, setPinPending] = useState(false);
    const handlePin = async () => {
        try {
            setPinPending(true);
            const response = await updateOneField(notesId, { field: 'pinned', value: !pinned });
            if (response.success) {
                dispatch(pinNote(notesId));
            }
        } catch (error) {
            console.error('Error pinning note:', error);
        } finally {
            setPinPending(false);
        }
    };
    return (<Tooltip title={pinned ? "Unpin note" : "Pin note"}>
        <IconButton

            className='pin'
            disableRipple
            disableTouchRipple
            sx={{
                position: 'absolute',
                top: "-12px",
                right: "-10px",
                padding: '0.2rem',
                zIndex: 5,
                backgroundColor: 'darkgrey',
                opacity: 0,
                transition: 'opacity 0.3s',
                '& .icon-filled': {
                    display: pinned ? 'block' : 'none',
                },
                '& .icon-outlined': {
                    display: pinned ? 'none' : 'block',
                },
                '&:hover .icon-filled': {
                    display: 'block',
                },
                '&:hover .icon-outlined': {
                    display: 'none',
                },
            }}
            size='small'
            aria-label="pin-note"
            onClick={pinPending ? () => { } : handlePin}
        >
            <PushPin className="icon-filled" fontSize='medium' />
            <PushPinOutlined className="icon-outlined" fontSize='medium' />
        </IconButton>
    </Tooltip>
    )
};
export default PinButton;
