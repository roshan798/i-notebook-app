import { Typography } from "@mui/material";

const NoteContent: React.FC<{ content: string }> = ({ content }) => (
    <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1 }}
    >
        {content}
    </Typography>
);
export default NoteContent;