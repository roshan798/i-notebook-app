import React from 'react';
import { List, ListItem, Checkbox, Typography } from '@mui/material';
import type { ChecklistItem } from '../../../store/types';
import { Color } from '../../../data/cardColor';

interface ChecklistProps {
    items: ChecklistItem[];
    color: Color;
}

const Checklist: React.FC<ChecklistProps> = ({ items, color }) => {
    return (
        <div>
            <List sx={{ padding: 0 }}>
                {items.map((item, index) => (
                    <ListItem
                        key={index}
                        disableGutters
                        sx={{
                            padding: '0.2rem 0',
                            margin: 0,
                            alignItems: 'center',
                            '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                        }}
                    >
                        <Checkbox
                            checked={item.completed}
                            disableRipple
                            sx={{ padding: '0.1rem' }}
                        />
                        <Typography
                            variant="body2"
                            sx={{
                                textDecoration: item.completed ? 'line-through' : 'none',
                                color: color.name !== "default" ? color.contentColor + (item.completed ?  "90": "e0") : "text.secondary",
                                marginLeft: '0.5rem',
                            }}
                        >
                            {item.text}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default Checklist;
