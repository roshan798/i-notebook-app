import React, { useState } from 'react';
import { Box, TextField, IconButton, Typography, Tooltip } from '@mui/material';
import { Add, CheckBox, CheckBoxOutlineBlank, Clear } from '@mui/icons-material';
import type { CheckListItem } from './tempTypes';
import { defaultBorderColor } from '../forms/create/CreateNoteForm';
export interface AddCheckListProps {
    items: CheckListItem[];
    addItem: (item: CheckListItem) => void;
    removeItem: (id: number) => void;
    toggleComplete: (id: number) => void;
    checkListRef: React.RefObject<HTMLDivElement>;
}

const AddCheckList: React.FC<AddCheckListProps> = ({ items,
    addItem,
    removeItem,
    toggleComplete,
    checkListRef

}) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddItem = () => {
        if (inputValue.trim() !== '') {
            addItem({
                id: Date.now(),
                text: inputValue,
                completed: false,
            });
            setInputValue('');
        }
    };

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleAddItem();
        }
    };

    const handleRemoveItem = (id: number) => {
        removeItem(id);
    };

    const handleToggleComplete = (id: number) => {
        toggleComplete(id);
    };

    return (
        <Box sx={{ width: '100%', borderLeft: '1px solid', borderRight: '1px solid', borderColor: defaultBorderColor }}>
            <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid', borderColor: defaultBorderColor, pl: 1 }}>
                <IconButton onClick={handleAddItem} size="small">
                    <Add />
                </IconButton>
                <TextField
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleInputKeyPress}
                    placeholder="List item"
                    fullWidth
                    ref={checkListRef}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                border: "none",
                            },
                            '&:hover fieldset': {
                                border: "none",
                            },
                            '&.Mui-focused fieldset': {
                                border: "none",
                            },
                        },
                    }}
                />
            </Box>
            {items.map((item) => (
                <Box
                    key={item.id}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        borderBottom: '1px solid transparent',
                        borderTop: '1px solid transparent',
                        p: 0,
                        pl: 1,
                        '&:hover': { borderColor: defaultBorderColor },
                        '&:hover .clear-icon': { visibility: "visible" },
                    }}
                >
                    <IconButton onClick={() => handleToggleComplete(item.id)} size="small">
                        {item.completed ? <CheckBox color="primary" /> : <CheckBoxOutlineBlank />}
                    </IconButton>
                    <Box sx={{
                        flexGrow: 1,
                        p: 0,
                        width: '100%',
                        textOverflow: "ellipsis",
                        overflow: 'hidden',
                        ml: 1
                    }}
                    >

                        <Typography variant="subtitle1" color="inherit" fontSize="small" sx={{
                            p: 0,
                            textDecoration: item.completed ? 'line-through' : 'none',
                            color: item.completed ? 'text.disabled' : 'text.primary'
                        }}>{item.text}</Typography></Box>
                    <Tooltip title="Remove" placement='left-end'>
                        <IconButton sx={{
                            visibility: 'hidden',
                        }} className='clear-icon' onClick={() => handleRemoveItem(item.id)} size="small">
                            <Clear />
                        </IconButton>
                    </Tooltip>
                </Box>
            ))}
        </Box>
    );
};

export default AddCheckList;
