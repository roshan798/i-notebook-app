import { Typography } from "@mui/material";
import { Color } from "../../../data/cardColor";

const NoteContent: React.FC<{ content: string,color:Color }> = ({ content,color }) => (
    <Typography
        variant="body2"
        color={color.name !=="default" ? color.contentColor + "e0" :  "text.secondary"}
        sx={{ mt: 1 }}
    >
        {content}
    </Typography>
);
export default NoteContent;