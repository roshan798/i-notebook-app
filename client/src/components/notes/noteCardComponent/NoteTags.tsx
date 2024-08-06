import { Box, Chip } from "@mui/material";
import { useState } from "react";
import { Color } from "../../../data/cardColor";

const NoteTags: React.FC<{ tags: string[], color: Color }> = ({ tags, color }) => {
    const [showMore, setShowMore] = useState(false);
    const chipsToShow = showMore ? tags : tags.slice(0, 4);
    const handleToggle = () => {
        setShowMore(!showMore);
    };
    const tagColor = color.name === "default" ? "" : color.chipText + "b0";

    return (
        <Box sx={{ mt: 2, mb: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {chipsToShow.map((tag) => (
                <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                        color: tagColor,
                        borderColor: tagColor,
                        '& .MuiChip-label': {
                            color: tagColor,
                        }
                    }}
                />
            ))}
            {tags.length > 4 && (
                <Chip
                    variant="outlined"
                    size="small"
                    label={showMore ? 'Show Less' : 'Show More'}
                    key={showMore ? 'Show Less' : 'Show More'}
                    onClick={handleToggle}
                    sx={{
                        color: tagColor, 
                        borderColor: tagColor,
                        '& .MuiChip-label': {
                            color: tagColor, 
                        }
                    }}
                />
            )}
        </Box>
    );
};

export default NoteTags;
