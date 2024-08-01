import { PushPin, PushPinOutlined } from "@mui/icons-material";
import { TextField, InputAdornment, Tooltip, IconButton } from "@mui/material";
import { defaultBorderColor } from "./CreateNoteForm";
interface TitleFieldProps {
    title: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    pinned: boolean;
    togglePin: () => void;
}
const TitleField = ({ title, handleChange, pinned, togglePin }: TitleFieldProps) => (
    <TextField
        id="title"
        name="title"
        value={title}
        placeholder="Title"
        onChange={handleChange}
        fullWidth
        sx={{
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderColor: defaultBorderColor,
                    borderBottom: 'none',
                },
                '&:hover fieldset': {
                    borderColor: defaultBorderColor,
                },
                '&.Mui-focused fieldset': {
                    borderWidth: 1,
                    borderBottom: 'solid 1px',
                    borderColor: defaultBorderColor,
                },
            },
        }}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <Tooltip title={pinned ? 'Unpin' : 'Pin'}>
                        <IconButton
                            aria-label="toggle pin"
                            className="pin"
                            disableRipple
                            disableTouchRipple
                            sx={{
                                '& .icon-filled': {
                                    display: pinned ? 'block' : 'none',
                                },
                                '& .icon-outlined': {
                                    display: !pinned ? 'block' : 'none',
                                },
                                '&:hover .icon-filled': {
                                    display: 'block',
                                },
                                '&:hover .icon-outlined': {
                                    display: 'none',
                                },
                            }}
                            size="small"
                            onClick={togglePin}
                        >
                            <PushPin className="icon-filled" fontSize="medium" />
                            <PushPinOutlined className="icon-outlined" fontSize="medium" />
                        </IconButton>
                    </Tooltip>
                </InputAdornment>
            ),
        }}
    />
);

export default TitleField;