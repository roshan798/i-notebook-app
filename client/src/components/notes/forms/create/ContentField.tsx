import { CheckBoxOutlined } from "@mui/icons-material";
import { TextField, InputAdornment, Tooltip, IconButton } from "@mui/material";
import { defaultBorderColor } from "./CreateNoteForm";

interface ContentFieldProps {
    content: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setTypeOfNote: React.Dispatch<React.SetStateAction<"note" | "list">>;
    handleContentClick: () => void;
    isTitleVisible: boolean;
}
const ContentField = ({ setTypeOfNote, content, handleChange, handleContentClick, isTitleVisible }: ContentFieldProps) => (
    <TextField
        id="content"
        name="content"
        value={content}
        onChange={handleChange}
        onClick={handleContentClick}
        onFocus={handleContentClick}
        placeholder="Take a note..."
        fullWidth
        multiline
        sx={{
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderRadius: isTitleVisible ? 0 : '4px',
                    borderColor: defaultBorderColor,
                    borderTop: isTitleVisible ? '0px' : '',
                    borderBottom: isTitleVisible ? '0px' : '',
                    top: '-6px',
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
        InputProps={
            !isTitleVisible
                ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip title="Add checklist">
                                <IconButton
                                    aria-label="toggle checklist"
                                    onClick={() => { setTypeOfNote("list") }}
                                >
                                    <CheckBoxOutlined />
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    ),
                }
                : {}
        }
    />
);

export default ContentField;