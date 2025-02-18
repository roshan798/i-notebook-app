import React from 'react';
import { Box, Typography, Tooltip } from "@mui/material";
import { formatDate, getRelativeTime } from "../../../utils/timeUtils";
import { Color } from '../../../data/cardColor';

interface NoteTitleProps {
    createdAt: Date | string;
    updatedAt: Date | string;
    title: string;
    setUpdateModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    color: Color
}


const NoteTitle: React.FC<NoteTitleProps> = ({ setUpdateModalOpen, createdAt, updatedAt, title, color }) => {


    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
                variant="h5"
                gutterBottom
                component="div"
                title={title}
                color={title ? color.titleColor + "de" || "textPrimary" : "GrayText"}
                onClick={() => setUpdateModalOpen(true)}
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontWeight: 600,
                    cursor: 'pointer',
                }}
            >
                {title ? title : "Add title"}
            </Typography>
            <Tooltip title={"Created: " + formatDate(createdAt)}>
                <Typography variant="caption" color={color.name === "default" ? "GrayText" : color.contentColor + "90"} sx={{
                    whiteSpace: 'nowrap',
                    '&:hover ': {
                        textDecoration: "underline",
                    }
                }}>
                    {getRelativeTime(updatedAt)}
                </Typography>
            </Tooltip>
        </Box>
    );
};

export default NoteTitle;
