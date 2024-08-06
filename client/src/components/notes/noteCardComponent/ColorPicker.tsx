import React from 'react';
import { Box, IconButton, Tooltip, Zoom } from "@mui/material";
import { useTheme } from '../../../theme/useTheme';
import { colorMap, Color } from '../../../data/cardColor';

const ColorPicker: React.FC<{ onSelect: (color: Color) => void }> = ({ onSelect }) => {
    const { theme } = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                maxWidth: 'min(90vw,400px)',
                gap: '8px',
                padding: '0.5rem',
                borderRadius: 1,
                boxShadow: 2,
                justifyContent: 'flex-start',
            }}>
            <Tooltip title="default">
                <IconButton
                    aria-label="default-color"
                    onClick={() => onSelect(colorMap["default"])}
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        width: 24,
                        height: 24,
                        border: "1px solid",
                        '&:hover': {
                            backgroundColor: theme.palette.background.default,
                            boxShadow: 1
                        }
                    }}
                />
            </Tooltip>

            {Object.entries(colorMap).map(([name, color]) => (
                name === "default" ? null :
                    <Tooltip key={name} title={name} color={color.value} TransitionComponent={Zoom} arrow>
                        <IconButton
                            onClick={() => onSelect(color)}
                            sx={{
                                backgroundColor: color.value,
                                width: 24,
                                height: 24,
                                '&:hover': {
                                    backgroundColor: color.value,
                                    border: "1px solid",
                                    boxShadow: 1
                                }
                            }}
                        />
                    </Tooltip>
            ))}
        </Box>
    );
};

export default ColorPicker;
