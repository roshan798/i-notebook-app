import { Box, Chip } from "@mui/material";
import { useState } from "react";
import { Color } from "./cardColor";

const NoteTags: React.FC<{ tags: string[], color: Color }> = ({ tags, color }) => {
    const [showMore, setShowMore] = useState(false);
    const chipsToShow = showMore ? tags : tags.slice(0, 4);
    const handleToggle = () => {
        setShowMore(!showMore);
    };

    return (
        <Box sx={{ mt: 2, mb: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {chipsToShow.map((tag) => (
                <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                        color: color.chipText,
                        borderColor: color.chipText,
                        '& .MuiChip-label': {
                            color: color.chipText,
                        }
                    }}
                />
            ))}
            {tags.length > 4 && (
                <Chip
                    variant="outlined"
                    size="small"
                    label={showMore ? 'Show Less' : 'Show More'}
                    color="secondary"
                    key={showMore ? 'Show Less' : 'Show More'}
                    onClick={handleToggle}
                    sx={{
                        color: color.textColor, // Apply text color
                        borderColor: color.chipText,
                        '& .MuiChip-label': {
                            color: color.chipText, // Apply text color inside Chip
                        }
                    }}
                />
            )}
        </Box>
    );
};

export default NoteTags;
