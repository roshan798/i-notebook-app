import { Typography } from "@mui/material";
import { Color } from "./cardColor";

const NoteContent: React.FC<{ content: string,color:Color }> = ({ content,color }) => (
    <Typography
        variant="body2"
        color={color.contentColor || "text.secondary"}
        sx={{ mt: 1 }}
    >
        {content}
    </Typography>
);
export default NoteContent;