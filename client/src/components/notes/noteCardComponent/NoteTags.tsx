import { Box, Chip } from "@mui/material";
import { useState } from "react";

const NoteTags: React.FC<{ tags: string[] }> = ({ tags }) => {
    const [showMore, setShowMore] = useState(false);
    const chipsToShow = showMore ? tags : tags.slice(0, 4);
    const handleToggle = () => {
        setShowMore(!showMore);
    };
    return (
        <Box sx={{ mt: 2, mb: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {chipsToShow.map((tag) => (
                <Chip variant="filled" key={tag} label={tag} size="small" />
            ))}
            {tags.length > 4 && (
                <Chip
                    variant="outlined"
                    size="small"
                    label={showMore ? 'Show Less' : 'Show More'}
                    color="secondary"
                    key={showMore ? 'Show Less' : 'Show More'}
                    onClick={handleToggle}
                />
            )}
        </Box>
    );
};

export default NoteTags;